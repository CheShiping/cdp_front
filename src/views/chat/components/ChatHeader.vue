<script lang="ts" setup>
import { ref, h } from 'vue';
import { Button, Space } from 'ant-design-vue';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { useDialogDrag } from '@/utils/dialogDrag';

const props = defineProps<{
  messages: {
    id?: string;
    content: string;
    role: 'user' | 'assistant';
    status?: 'sending' | 'success' | 'error';
  }[];
  onClose: () => void;
  onClearMessages: () => void;
}>();

const emit = defineEmits<{
  (e: 'clear-messages'): void;
}>();

const modalTitleRef = ref<HTMLDivElement | null>(null);
const { transformStyle } = useDialogDrag(modalTitleRef);

defineExpose({
  modalTitleRef
});
</script>

<template>
  <div 
    ref="modalTitleRef"
    class="chat-header"
    :style="transformStyle"
  >
    <div class="header-title">
      ✨ 天机AI助理
    </div>
    <Space :size="0">
      <Button
        type="text"
        :icon="h(PlusOutlined)"
        class="header-button"
        @click="$emit('clear-messages')"
      />
      <Button
        type="text"
        :icon="h(CloseOutlined)"
        class="header-button"
        @click="onClose"
      />
    </Space>
  </div>
</template>

<style scoped lang="scss">
.chat-header {
  height: 52px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 16px;
  cursor: move; // 显示可以拖拽
}

.header-title {
  font-weight: 600;
  font-size: 15px;
}

.header-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
</style>