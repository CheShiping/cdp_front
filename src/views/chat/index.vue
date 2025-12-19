<script lang="ts" setup>
import { ref, nextTick, h, computed } from 'vue';
import { bot } from '@/ai/bot'; // 导入Bot实例
import ChatHeader from './components/ChatHeader.vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatInput from './components/ChatInput.vue';
import { useDialogDrag } from '@/utils/dialogDrag'; // 导入拖拽功能

// 使用 props 和 emit 控制显隐
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'update:messages', messages: ChatMessage[]): void;
}>();

// 定义对话消息类型
interface ChatMessage {
  id?: string;
  content: string;
  role: 'user' | 'assistant';
  status?: 'sending' | 'success' | 'error';
}

// refs
const chatHeaderRef = ref<InstanceType<typeof ChatHeader> | null>(null);

// ==================== State ====================
const inputValue = ref('');
const messages = ref<ChatMessage[]>([
  {
    id: 'welcome',
    content: '你好！我是天机AI助理，有什么我可以帮你的吗？',
    role: 'assistant',
    status: 'success'
  }
]);
const isLoading = ref(false);
const abortController = ref<AbortController | null>(null);

// 使用拖拽功能
const modalTitleRef = computed(() => chatHeaderRef.value?.modalTitleRef || null);
const { transformStyle } = useDialogDrag(modalTitleRef);

// ==================== Event ====================
const handleUserSubmit = async (value: string) => {
  if (!value.trim() || isLoading.value) return;
  
  // 添加用户消息
  const userMessage: ChatMessage = {
    id: Date.now().toString(),
    content: value,
    role: 'user',
    status: 'success'
  };
  
  messages.value.push(userMessage);
  
  // 添加 AI 回复占位符
  const aiMessageId = (Date.now() + 1).toString();
  const aiMessage: ChatMessage = {
    id: aiMessageId,
    content: '',
    role: 'assistant',
    status: 'sending'
  };
  
  messages.value.push(aiMessage);
  isLoading.value = true;
  
  try {
    // 创建新的 AbortController 用于可能的请求中断
    abortController.value = new AbortController();
    
    // 用流式聊天函数
    const stream = await bot.askStreaming(value, { signal: abortController.value.signal });
    
    // 逐块处理流式响应
    for await (const chunk of stream) {
      // 检查是否已中断
      if (abortController.value?.signal.aborted) {
        break;
      }
      
      // 更新 AI 消息内容
      const lastMessage = messages.value[messages.value.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        lastMessage.content += chunk.content;
        lastMessage.status = 'success';
      }
      
      // 滚动到底部
      nextTick(() => {
        const container = document.querySelector('.ant-x-bubble-list');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  } catch (error: unknown) {
    // 处理错误或中断情况
    const lastMessage = messages.value[messages.value.length - 1];
    if (lastMessage) {
      if ((error as Error).name === 'AbortError' || (error as Error).message === 'Request aborted') {
        // 请求被中断时，保留已生成的内容，仅更新状态
        if (lastMessage.role === 'assistant') {
          // 只有当消息内容为空时才显示"请求已被取消"
          if (!lastMessage.content) {
            lastMessage.content = '请求已被取消';
          }
          lastMessage.status = 'error';
        }
      } else {
        if (lastMessage.role === 'assistant') {
          lastMessage.content = '请求失败，请重试！';
          lastMessage.status = 'error';
        }
      }
    }
  } finally {
    isLoading.value = false;
  }
};

const handleClose = () => {
  // 如果正在加载，只中断请求但不改变消息状态
  if (isLoading.value && abortController.value) {
    abortController.value.abort();
    // 不再清除消息，保持现有对话内容
  }
  emit('update:open', false);
};

// 新增函数：停止生成
const handleStopGenerate = () => {
  if (isLoading.value && abortController.value) {
    // 记录中断操作
    console.log('Stopping generation...');
    abortController.value.abort();
    // 立即设置加载状态为 false
    isLoading.value = false;
    // 强制刷新UI
    nextTick(() => {});
  }
};

const handleClearMessages = () => {
  messages.value = [{
    id: 'welcome',
    content: '你好！我是天机AI助理，有什么我可以帮你的吗？',
    role: 'assistant',
    status: 'success'
  }];
};

const handleRetry = (messageId: string) => {
  // TODO: 实现重试功能
  console.log('Retry message:', messageId);
};

const handleCopy = (content: string) => {
  // TODO: 实现复制功能
  console.log('Copy content:', content);
};

const handleLike = (messageId: string) => {
  // TODO: 实现点赞功能
  console.log('Like message:', messageId);
};

const handleDislike = (messageId: string) => {
  // TODO: 实现点踩功能
  console.log('Dislike message:', messageId);
};

const handleQuestionClick = (question: string) => {
  handleUserSubmit(question);
};

const handleQuickQuestion = (question: string) => {
  handleUserSubmit(question);
};
</script>

<template>
  <!-- 使用 ant-design-x-vue 的 XProvider 包裹整个对话界面 -->
  <a-modal
    :open="props.open"
    @update:open="(val: boolean) => emit('update:open', val)"
    :wrap-style="{ overflow: 'hidden' }"
    :mask="false"
    :closable="false"
    :keyboard="false"
    :maskClosable="false"
    :footer="null"
    width="520px"
    class="ai-assistant-modal"
    :style="transformStyle"
  >
    <div class="chat-wrapper">
      <!-- 对话区 - header -->
      <ChatHeader
        ref="chatHeaderRef"
        :messages="messages"
        @close="handleClose"
        @clear-messages="handleClearMessages"
      /> 
      
      <!-- 对话区 - 消息列表 -->
      <ChatMessages
        :messages="messages"
        :is-loading="isLoading"
        @retry="handleRetry"
        @copy="handleCopy"
        @like="handleLike"
        @dislike="handleDislike"
        @question-click="handleQuestionClick"
      /> 

      <!-- 对话区 - 输入框 -->
      <ChatInput
        :input-value="inputValue"
        :is-loading="isLoading"
        @update:inputValue="(val) => inputValue = val"
        @submit="() => {
          handleUserSubmit(inputValue);
          inputValue = '';
        }"
        @stop-generate="handleStopGenerate"
        @quick-question="handleQuickQuestion"
      /> 
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>