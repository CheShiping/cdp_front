<script lang="ts" setup>
import { ref, h } from 'vue';
import { Sender, XProvider, } from 'ant-design-x-vue';
import { Button } from 'ant-design-vue';

const props = defineProps<{
  inputValue: string;
  isLoading: boolean;
  onStopGenerate: () => void;
}>();

const emit = defineEmits<{
  (e: 'update:inputValue', value: string): void;
  (e: 'submit'): void;
  (e: 'quick-question', question: string): void;
}>();

const senderRef = ref<InstanceType<typeof Sender> | null>(null);
</script>

<template>
  <div class="chat-send">
    <div class="send-action">
      <Button @click="$emit('quick-question', '你好，你能帮我做什么？')">
        功能介绍
      </Button>
      <Button @click="$emit('quick-question', '请介绍一下你自己')">
        自我介绍
      </Button>
    </div>
    
    <!-- 使用 XProvider 包裹 Conversations 和 Sender -->
    <XProvider>
      <!-- 使用 Sender 组件发送消息 -->
      <Sender 
        ref="senderRef"
        :loading="isLoading"
        :value="inputValue"
        placeholder="请输入您的问题..."
        @change="(v: string) => $emit('update:inputValue', v)"
        @submit="() => $emit('submit')"
        @cancel="onStopGenerate"
      >
      </Sender>
    </XProvider>
  </div>
</template>

<style scoped lang="scss">
.chat-send {
  padding: 12px;
}

.send-action {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}
</style>