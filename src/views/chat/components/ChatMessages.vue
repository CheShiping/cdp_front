<script lang="ts" setup>
import { h } from 'vue';
import { Bubble, Welcome, Prompts } from 'ant-design-x-vue';
import { Button, Space, Spin } from 'ant-design-vue';
import { 
  ReloadOutlined, 
  CopyOutlined, 
  LikeOutlined, 
  DislikeOutlined
} from '@ant-design/icons-vue';

const props = defineProps<{
  messages: {
    id?: string;
    content: string;
    role: 'user' | 'assistant';
    status?: 'sending' | 'success' | 'error';
  }[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'retry', messageId: string): void;
  (e: 'copy', content: string): void;
  (e: 'like', messageId: string): void;
  (e: 'dislike', messageId: string): void;
  (e: 'question-click', question: string): void;
}>();

const MOCK_QUESTIONS = [
  '你好，你能帮我做什么？',
  '请介绍一下你自己',
  '如何使用这个系统？'
];

const AGENT_PLACEHOLDER = 'AI助手正在思考中...';

// 定义头像URL
const USER_AVATAR = 'https://avatars.githubusercontent.com/u/12345678'; // 用户头像占位符
const AI_AVATAR = 'https://avatars.githubusercontent.com/u/98765432'; // AI助手头像占位符

const roles: typeof Bubble.List['roles'] = {
  assistant: {
    placement: 'start',
    avatar: AI_AVATAR,
    footer: (message: any) => h('div', { style: { display: 'flex' } }, [
      h(Button, { 
        type: 'text', 
        size: 'small', 
        icon: h(ReloadOutlined), 
        onClick: () => emit('retry', message.id) 
      }),
      h(Button, { 
        type: 'text', 
        size: 'small', 
        icon: h(CopyOutlined), 
        onClick: () => emit('copy', message.content) 
      }),
      h(Button, { 
        type: 'text', 
        size: 'small', 
        icon: h(LikeOutlined), 
        onClick: () => emit('like', message.id) 
      }),
      h(Button, { 
        type: 'text', 
        size: 'small', 
        icon: h(DislikeOutlined), 
        onClick: () => emit('dislike', message.id) 
      }),
    ]),
    loadingRender: () => h(
      Space,
      {},
      [
        h(Spin, { size: 'small' }, []),
        AGENT_PLACEHOLDER,
      ]
    )
  },
  user: { 
    placement: 'end',
    avatar: USER_AVATAR
  },
};
</script>

<template>
  <div class="chat-list">
    <Bubble.List
      v-if="messages && messages.length > 0 && !(messages.length === 1 && messages[0]?.id === 'welcome')"
      class="chat-bubble-list"
      :items="messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        classes: {
          content: msg.status === 'sending' ? 'loading-message' : '',
        },
        loading: msg.status === 'sending',
        typing: msg.status === 'sending' ? { step: 5, interval: 20 } : false,
      }))" 
      :roles="roles"
    />
    <template v-else>
      <Welcome
        variant="borderless"
        title="👋 你好，我是天机AI助理"
        description="基于先进的人工智能技术，我可以回答问题、创作文字，如写故事、写公文、写邮件、写剧本、逻辑推理、编程等，还能表达观点，玩游戏等。"
        class="chat-welcome"
      />
      <Prompts
        vertical
        title="我可以帮助您："
        :items="MOCK_QUESTIONS.map((i) => ({ key: i, description: i }))"
        class="chat-prompts"
        :styles="{
          title: { fontSize: 14 },
        }"
        @item-click="(info: any) => $emit('question-click', info?.data?.description as string)"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.chat-list {
  overflow: auto;
  padding-block: 16px;
  flex: 1;
  
  // 添加自定义滚动条样式确保在各浏览器中都能正常显示
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f5f5f5;
  
  // 确保容器有足够高度以显示滚动条
  min-height: 200px;
  
  // 设置最大高度以防止对话框被撑大
  max-height: calc(100vh - 400px);
}

.chat-welcome {
  margin-inline: 16px;
  padding: 12px 16px;
  border-radius: 2px 12px 12px 12px;
  background: #f5f5f5;
  margin-bottom: 16px;
}

.loading-message {
  background-image: linear-gradient(90deg, #1890ff 0%, #0050b3 100%);
  background-size: 100% 2px;
  background-repeat: no-repeat;
  background-position: bottom;
}

.chat-bubble-list {
  height: 50%;
  padding-inline: 12px;
}

.chat-prompts {
  margin-inline: 16px;
}
</style>