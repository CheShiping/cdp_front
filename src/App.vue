<script setup lang="ts">
import { theme } from 'ant-design-vue';

// 基于 app.scss 中的颜色定义自定义主题
const customTheme = {
  token: {
    colorPrimary: '#16C2A3', // 使用主色
    colorSuccess: '#73d13d', // 邻近绿色
    colorWarning: '#FAAD14', // 邻近黄色
    colorError: '#ff4d4f', // 邻近红色
    colorInfo: '#722ED1', // 邻近紫色
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: '#16C2A3',
      colorLink: '#16C2A3',
      colorSuccess: '#73d13d', // 邻近绿色
      colorWarning: '#FAAD14', // 邻近黄色
      colorError: '#ff4d4f', // 邻近红色
      colorInfo: '#722ED1', // 邻近紫色
    },
    Progress: {
      colorSuccess: '#73d13d', // 邻近绿色
      colorWarning: '#FAAD14', // 邻近黄色
      colorError: '#ff4d4f', // 邻近红色
      colorInfo: '#722ED1', // 邻近紫色
    }
  }
};
</script>

<template>
  <a-config-provider :theme="customTheme">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>