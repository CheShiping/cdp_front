<template>
  <div class="link-container">
    <h1>外部链接页面</h1>
    <p>即将跳转到成都职业技术学院官网...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 如果有外部链接，则跳转
  const route = router.currentRoute.value
  if (route.meta.linkTo) {
    window.open(route.meta.linkTo as string, '_blank')
    // 同时返回上一页或者首页
    router.back()
  }
})
</script>

<style scoped>
.link-container {
  text-align: center;
  padding: 20px;
}
</style>