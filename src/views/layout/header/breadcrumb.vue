<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <a-breadcrumb separator="/">
    <a-breadcrumb-item>
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item>首页</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style scoped>
.ant-breadcrumb {
  margin-left: 16px;
}
</style>