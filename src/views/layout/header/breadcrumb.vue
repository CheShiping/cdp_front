<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter, type RouteLocationNormalized, type RouteRecordNormalized } from 'vue-router';

const route = useRoute()
const router = useRouter()
const breadcrumbList = ref<RouteRecordNormalized[]>([])

onMounted(() => {
  getBreadcrumb(route)
})

onBeforeRouteUpdate((to) => {
  getBreadcrumb(to)
})

const getBreadcrumb = (to: RouteLocationNormalized) => {
  const matched = to.matched.filter(item => item.meta && item.meta.title && item.meta.isBreadcrumb !== false)
  breadcrumbList.value = matched || []
}

const handleLink = (_route: RouteRecordNormalized) => {
  const { redirect, path } = _route
  if (redirect) router.push(redirect as string)
  else router.push(path)
}
</script>

<template>
  <a-breadcrumb separator="/">
    <a-breadcrumb-item @click="router.push('/')">
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item 
      v-for="(item, index) in breadcrumbList.slice(1)" 
      :key="item.path"
      :class="{ 'last-breadcrumb': index === breadcrumbList.length - 2 }"
    >
      <span v-if="index === breadcrumbList.length - 2">{{ item.meta?.title }}</span>
      <span 
        v-else 
        @click="handleLink(item)" 
        style="cursor: pointer; color: #1890ff;"
      >
        {{ item.meta?.title }}
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style scoped>
.ant-breadcrumb {
  margin-left: 16px;
}

.last-breadcrumb {
  color: #999;
}
</style>