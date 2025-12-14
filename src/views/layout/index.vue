<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';

// 异步加载组件
const Aside = defineAsyncComponent(() => import('./aside/Aside.vue'));
const Header = defineAsyncComponent(() => import('./header/Header.vue'));
const Main = defineAsyncComponent(() => import('./main/Main.vue'));
const Footer = defineAsyncComponent(() => import('./footer/Footer.vue'));

const collapsed = ref<boolean>(false);
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
</template>

<style scoped lang="scss">
.main-layout {
  min-height: 100vh;
}
</style>