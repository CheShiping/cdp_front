<template>
  <div>
    <!-- 自定义模态框（无遮罩，可拖动） -->
    <a-modal
      v-model:open="open"
      :wrap-style="{ overflow: 'hidden' }"
      :mask="false"
      :closable="true"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      class="ai-assistant-modal"
    >
      <!-- 拖动标题栏 -->
      <template #title>
        <div
          ref="modalTitleRef"
          class="drag-handle"
          style="width: 100%; cursor: move; user-select: none;"
        >
          <div class="title-content">
            <span class="emoji">🤖</span>
            <span class="title-text">天机AI助理</span>
          </div>
        </div>
      </template>

      <!-- 聊天容器：固定高度 -->
      <div class="chat-container">
        <!-- 可滚动区域 -->
        <div class="scrollable-area" ref="scrollableAreaRef">
          <!-- 初始欢迎语（仅当未开始对话时） -->
          <div v-if="shouldShowSuggestions" class="greeting">
            <p class="hello">👋 Hello，我是天机AI助理</p>
            <p class="description">
              我是由天机学堂倾力打造的智能助理，我不仅能推荐课程、答疑解惑，
              还能为您激发创意、畅聊心事。
            </p>
          </div>

          <!-- 聊天历史（过滤掉初始欢迎语后的消息） -->
          <div class="chat-history">
            <div
              v-for="(message, index) in displayMessages"
              :key="index"
              :class="['message', { 'user-message': message.role === 'user', 'ai-message': message.role === 'ai' }]"
            >
              <div class="message-content">{{ message.content }}</div>
            </div>
          </div>

          <!-- 推荐问题（仅初始状态） -->
          <div v-if="shouldShowSuggestions" class="suggestions">
            <div
              class="suggestion-item"
              @click="askQuestion('课程推荐 能帮我推荐一个合适的课吗？')"
            >
              <span class="icon">👍</span>
              <span>课程推荐 能帮我推荐一个合适的课吗？</span>
            </div>
            <div
              class="suggestion-item"
              @click="askQuestion('课程推荐 最近有什么新课吗？')"
            >
              <span class="icon">🔥</span>
              <span>课程推荐 最近有什么新课吗？</span>
            </div>
            <div
              class="suggestion-item"
              @click="askQuestion('学习安排 根据我的学习时长、习惯、课程，帮我制定下一个阶段的学习计划。')"
            >
              <span class="icon">📅</span>
              <span>学习安排 根据我的学习时长、习惯、课程，帮我制定下一个阶段的学习计划。</span>
            </div>
          </div>
        </div>

        <!-- 输入区域（固定在底部） -->
        <div class="input-area">
          <textarea
            v-model="userInput"
            placeholder="请将您的问题告诉我，Shift+Enter换行"
            class="input-box"
            rows="1"
            @keydown.enter="handleKeyDown"
          ></textarea>
          <div class="input-actions">
            <a-button type="link" size="small">📷</a-button>
            <a-button type="link" size="small">📋</a-button>
            <a-button type="link" size="small">🎙️</a-button>
            <a-button type="primary" size="small" @click="sendQuestion">📤</a-button>
          </div>
        </div>
      </div>

      <!-- 自定义渲染：支持拖动 -->
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, watchEffect, nextTick } from 'vue';
import { useDraggable } from '@vueuse/core';
// 假设你有这个接口，若没有可注释掉并 mock
import { streamChat } from '../../ai/aliBaiLian';

// 使用 v-model:open 控制显隐
const open = defineModel<boolean>('open', { default: false });

// refs
const modalTitleRef = ref<HTMLElement | null>(null);
const scrollableAreaRef = ref<HTMLElement | null>(null);

// 用户输入
const userInput = ref('');

// 聊天历史（初始为 AI 欢迎语）
const chatHistory = ref<Array<{ role: 'user' | 'ai'; content: string }>>([
  { role: 'ai', content: 'Hello，我是天机AI助理' }
]);

// 控制流式请求的 AbortController
const abortController = ref<AbortController | null>(null);

// 是否显示推荐问题：仅当只有初始欢迎消息时
const shouldShowSuggestions = computed(() => {
  return chatHistory.value.length === 1;
});

// 显示的消息（始终排除初始欢迎语，避免重复）
const displayMessages = computed(() => {
  // 如果处于初始状态，不显示任何历史（由 greeting 单独展示）
  if (shouldShowSuggestions.value) {
    return [];
  }
  // 否则显示全部（包括欢迎语之后的所有对话）
  return chatHistory.value;
});

// 发送问题
const sendQuestion = async () => {
  const question = userInput.value.trim();
  if (!question) return;

  // 清空输入
  userInput.value = '';

  // 添加用户消息
  chatHistory.value.push({ role: 'user', content: question });

  // 添加加载占位符
  chatHistory.value.push({ role: 'ai', content: '...' });

  // 滚动到底部
  scrollToBottom();

  // 创建新的 AbortController 用于控制此请求
  abortController.value = new AbortController();
  
  // 调用真实的 AI 流式回复
  try {
    // 获取除了最后一条 "..." 之外的所有消息历史
    const historyMessages = chatHistory.value.slice(0, -1);
    
    // 调用阿里百炼流式接口，传递 signal 用于中断请求
    const stream = streamChat(historyMessages, { signal: abortController.value.signal });
    
    let accumulatedResponse = '';
    
    // 逐块接收流式响应
    for await (const chunk of stream) {
      accumulatedResponse += chunk.content.toString();
      
      // 更新最后一条 AI 消息
      const lastIndex = chatHistory.value.length - 1;
      if (chatHistory.value[lastIndex]) {
        chatHistory.value[lastIndex].content = accumulatedResponse;
        scrollToBottom();
      }
    }
  } catch (error: unknown) {
    // 检查是否是由于主动中断导致的错误
    if ((error instanceof Error && error.name === 'AbortError') || (typeof error === 'object' && error !== null && 'message' in error && error.message === 'Request aborted')) {
      console.log('请求已被用户中断');
      return;
    }
    
    console.error('AI 回复出错:', error);
    const lastIndex = chatHistory.value.length - 1;
    if (chatHistory.value[lastIndex]) {
      chatHistory.value[lastIndex].content =
        '抱歉，我在回复时遇到了问题，请稍后再试。';
    }
  }

  // 最终滚动
  scrollToBottom();
};

// 快捷提问
const askQuestion = (question: string) => {
  userInput.value = question;
  sendQuestion();
};

// 键盘事件：Enter 发送，Shift+Enter 换行
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendQuestion();
  }
};

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (scrollableAreaRef.value) {
    scrollableAreaRef.value.scrollTop = scrollableAreaRef.value.scrollHeight;
  }
};

// 监听聊天记录变化，自动滚动
watch(chatHistory, scrollToBottom);

// 监听模态框打开状态的变化
watch(open, (newVal) => {
  if (!newVal) {
    // 当模态框关闭时，中断正在进行的请求
    if (abortController.value) {
      abortController.value.abort();
      abortController.value = null;
    }
    
    // 重置聊天历史到初始状态
    chatHistory.value = [{ role: 'ai', content: 'Hello，我是天机AI助理' }];
  } else {
    // 当模态框打开时，滚动到顶部
    nextTick(() => {
      if (scrollableAreaRef.value) {
        scrollableAreaRef.value.scrollTop = 0;
      }
    });
  }
});

// ===== 拖拽逻辑 =====
const { x, y, isDragging } = useDraggable(modalTitleRef);

const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
const transformX = ref(0);
const transformY = ref(0);

watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value?.getBoundingClientRect();
    if (titleRect) {
      dragRect.value.right = bodyRect.width - titleRect.width;
      dragRect.value.bottom = bodyRect.height - titleRect.height;
    }
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});

watch(isDragging, (dragging) => {
  if (!dragging) startedDrag.value = false;
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});

const transformStyle = computed(() => ({
  transform: `translate(${transformX.value}px, ${transformY.value}px)`,
}));
</script>

<style scoped>
.ai-assistant-modal {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: white;
  width: 360px !important;
  max-width: none !important;
  min-width: auto !important;
  pointer-events: auto;
}

.drag-handle {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.emoji {
  font-size: 1.2em;
}

.title-text {
  font-size: 14px;
}

/* 聊天容器 */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 80vh;
}

.scrollable-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 0;
}

.greeting {
  text-align: center;
  margin-bottom: 16px;
}

.hello {
  color: #1d9df5;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.description {
  color: #555;
  font-size: 14px;
  margin: 8px 0 0;
}

/* 聊天消息 */
.chat-history {
  margin-bottom: 16px;
}

.message {
  display: flex;
  margin-bottom: 12px;
}

.message.user-message {
  justify-content: flex-end;
}

.message.ai-message {
  justify-content: flex-start;
}

.message-content {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 80%;
}

.user-message .message-content {
  background-color: #e1f5fe;
  color: #000;
  border-bottom-right-radius: 4px;
}

.ai-message .message-content {
  background-color: #f1f1f1;
  color: #333;
  border-bottom-left-radius: 4px;
}

/* 推荐问题 */
.suggestions {
  margin-top: 8px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-item:hover {
  background: #e9ecef;
}

.icon {
  margin-right: 8px;
  font-size: 16px;
}

/* 输入区 */
.input-area {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: white;
}

.input-box {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  resize: none;
  outline: none;
  font-size: 14px;
  background: #fafafa;
  box-sizing: border-box;
  min-height: 24px;
  max-height: 100px;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}
</style>