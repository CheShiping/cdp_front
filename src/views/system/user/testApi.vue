<template>
  <div>
    <h2>API测试页面</h2>
    <a-button type="primary" @click="testApi">测试API调用</a-button>
    <div v-if="loading">加载中...</div>
    <div v-if="result">
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
    <div v-if="error">
      <a-alert type="error" :message="error"></a-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getEmployeeInfo } from '@/api/test'

const loading = ref(false)
const result = ref<any>(null)
const error = ref<string | null>(null)

const testApi = async () => {
  loading.value = true
  result.value = null
  error.value = null
  
  try {
    const res = await getEmployeeInfo()
    result.value = res
    console.log('API调用成功:', res)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
    console.error('API调用失败:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>