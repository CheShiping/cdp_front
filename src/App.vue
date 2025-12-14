<script setup lang="ts">
import { theme, ConfigProvider } from 'ant-design-vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

// 基于 app.scss 中的颜色定义自定义主题
const lightTheme = {
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

// 暗黑主题配置
const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#16C2A3', // 使用主色
    colorSuccess: '#52C41A', // 使用原生绿色
    colorWarning: '#FAAD14', // 邻近黄色
    colorError: '#F5222D', // 使用原生红色
    colorInfo: '#722ED1', // 邻近紫色
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: '#16C2A3',
      colorLink: '#16C2A3',
      colorSuccess: '#52C41A', // 使用原生绿色
      colorWarning: '#FAAD14', // 邻近黄色
      colorError: '#F5222D', // 使用原生红色
      colorInfo: '#722ED1', // 邻近紫色
    },
    Progress: {
      colorSuccess: '#52C41A', // 使用原生绿色
      colorWarning: '#FAAD14', // 邻近黄色
      colorError: '#F5222D', // 使用原生红色
      colorInfo: '#722ED1', // 邻近紫色
    }
  }
};
</script>

<template>
  <a-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>