<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { Button, Row, Col, Card } from 'ant-design-vue';

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleOk = () => {
  console.log('OK clicked')
  closeModal()
}

const router = useRouter();

const goToThemeDemo = () => {
  router.push('/theme-demo');
};

const goToAbout = () => {
  router.push('/about');
};
</script>

<template>
  <div class="home">
    <div class="hero">
      <img alt="Vue logo" src="../assets/logo.png" width="200" />
      <h1>CDP 前端项目</h1>
      <p>基于 Vue 3 + TypeScript + Ant Design Vue 构建</p>
      
      <div class="actions">
        <a-button type="primary" size="large" @click="goToThemeDemo">
          查看主题演示
        </a-button>
        <a-button size="large" @click="goToAbout">
          关于页面
        </a-button>
      </div>
    </div>
    
    <div class="features">
      <a-row :gutter="[24, 24]">
        <a-col :span="8">
          <a-card title="Vue 3" style="text-align: center;">
            <p>使用最新的 Vue 3 Composition API</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="TypeScript" style="text-align: center;">
            <p>强类型语言支持，提高开发效率</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="Ant Design Vue" style="text-align: center;">
            <p>企业级 UI 组件库，支持主题定制</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 20px 0;
  color: var(--mxg-color-text1);
}

.hero p {
  font-size: 1.2rem;
  color: var(--mxg-color-text2);
  margin-bottom: 30px;
}

.actions {
  margin: 30px 0;
}

.actions button {
  margin: 0 10px;
}

.features {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
