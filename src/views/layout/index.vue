```
<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
// 引入自定义gif图片
import chengzhier from '@/assets/chengzhier.gif';
import chengzhierezgif from '@/assets/chengzhier-ezgif.com-effects.gif'
import ChatIndex from '@/views/chat/index.vue';

// 异步加载组件
const Aside = defineAsyncComponent(() => import('./aside/Aside.vue'));
const Header = defineAsyncComponent(() => import('./header/Header.vue'));
const Main = defineAsyncComponent(() => import('./main/Main.vue'));
const Footer = defineAsyncComponent(() => import('./footer/Footer.vue'));

const collapsed = ref<boolean>(false);

// 控制AI助手模态框的显示
const showAIAssistant = ref(false);
</script>

<template>
  <a-layout class="main-layout">
    <Aside v-model:collapsed="collapsed" /> 
    <a-layout class="layout-content">
      <Header v-model:collapsed="collapsed" /> 
      <Main /> 
      <Footer /> 
    </a-layout>
  </a-layout>
  
  <!-- 独立显示的GIF动图 -->
  <div style="position: fixed; right: 24px; bottom: 24px; z-index: 999; cursor: pointer;" @click="showAIAssistant = true">
    <img :src="chengzhierezgif" alt="AI Assistant" style="width: 132px; height: 132px; object-fit: contain;" /> 
  </div>
  
  <!-- AI助手模态框 -->
  <chat-index v-model:open="showAIAssistant" /> 
</template>

<style scoped lang="scss">
.main-layout {
  min-height: 100vh;
}
</style>
```