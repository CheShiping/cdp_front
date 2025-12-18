<template>
  <div>
    <!-- 自定义模态框（无遮罩，可拖动） -->
    <a-modal
      ref="modalRef"
      v-model:open="open"
      :wrap-style="{ overflow: 'hidden' }"
      :mask="false"
      :closable="false"
      :keyboard="false"
      @ok="handleOk"
      @cancel="handleOk"
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

      <!-- 模态框内容 -->
      <div class="assistant-content">
        <div class="avatar-container">
          <img src="https://via.placeholder.com/120/FFD700/000000?text=AI" alt="AI Assistant" />
          <div class="speech-bubble">Hi</div>
        </div>

        <div class="greeting">
          <p class="hello">👋 Hello，我是天机AI助理</p>
          <p class="description">
            我是由天机学堂倾力打造的智能助理，我不仅能推荐课程、答疑解惑，
            还能为您激发创意、畅聊心事。
          </p>
        </div>

        <div class="suggestions">
          <div class="suggestion-item">
            <span class="icon">👍</span>
            <span>课程推荐 能帮我推荐一个合适的课吗？</span>
          </div>
          <div class="suggestion-item">
            <span class="icon">🔥</span>
            <span>课程推荐 最近有什么新课吗？</span>
          </div>
          <div class="suggestion-item">
            <span class="icon">📅</span>
            <span>学习安排 根据我的学习时长、习惯、课程，帮我制定下一个阶段的学习计划。</span>
          </div>
        </div>

        <div class="input-area">
          <textarea
            placeholder="请将您的问题告诉我，Shift+Enter换行"
            class="input-box"
            rows="1"
          ></textarea>
          <div class="input-actions">
            <a-button type="link" size="small" icon="camera">📷</a-button>
            <a-button type="link" size="small" icon="copy">📋</a-button>
            <a-button type="link" size="small" icon="microphone">🎙️</a-button>
            <a-button type="primary" size="small" icon="send">📤</a-button>
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
import { ref, computed, watch, watchEffect } from 'vue';
import { useDraggable } from '@vueuse/core';

// 通过 v-model:open 控制弹窗是否打开
const open = defineModel<boolean>('open', { required: false, default: false });

// 弹窗标题元素引用
const modalTitleRef = ref<HTMLElement | null>(null);

// 关闭弹窗
const handleOk = () => {
  open.value = false;
};

// 使用 useDraggable 实现拖动
const { x, y, isDragging } = useDraggable(modalTitleRef);

// 拖动开始时记录初始位置
const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);

// 记录上一次变换位置
const preTransformX = ref(0);
const preTransformY = ref(0);

// 界面边界限制
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

// 监听拖动开始
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

// 拖动结束重置状态
watch(isDragging, (isDragging) => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

// 实时计算变换值
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

// 计算 transform 样式
const transformX = ref(0);
const transformY = ref(0);
const transformStyle = computed(() => ({
  transform: `translate(${transformX.value}px, ${transformY.value}px)`,
}));
</script>

<style scoped>
.ai-assistant-modal {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: white;
  max-width: 400px;
  min-width: 300px;
  overflow: hidden;
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

.assistant-content {
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.avatar-container {
  text-align: center;
  margin-bottom: 16px;
  position: relative;
}

.avatar-container img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.speech-bubble {
  position: absolute;
  top: -10px;
  right: 10px;
  background: #ff6b00;
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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

.suggestions {
  margin-bottom: 16px;
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

.input-area {
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
  position: relative;
}

.input-box {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  outline: none;
  font-size: 14px;
  line-height: 1.5;
  background: #f9f9f9;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.input-actions button {
  padding: 4px;
  font-size: 14px;
}
</style>