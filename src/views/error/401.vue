<template>
  <div class="error-page">
    <div class="error-content">
      <img src="@/assets/401.svg" alt="401错误" class="error-image" />
      <h1>401 未授权访问</h1>
      <p class="error-description">抱歉，您没有权限访问该页面。</p>
      <div class="error-actions">
        <a-button type="primary" @click="goHome">返回首页</a-button>
        <a-button @click="goBack">返回上一页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.error-content {
  text-align: center;
  padding: 20px;
}

.error-image {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  margin-bottom: 20px;
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.error-description {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}

.error-actions button {
  margin: 0 10px;
}
</style>