<template>
  <a-layout-content class="content">
    <div class="content-wrapper">
      <router-view v-slot="{Component, route}">
        <transition name="fade-transform" mode="out-in">
          <div :key="route.fullPath">
            <keep-alive :include="cachedViews">
              <component :is="Component" v-if="route.meta.cache !== false" />
            </keep-alive>
            <component :is="Component" v-if="route.meta.cache === false" />
          </div>
        </transition>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cachedViews = ref<string[]>([])

// 监听路由变化，根据 meta.cache 判断是否需要缓存
watch(
  route,
  (to) => {
    if (to.meta?.cache && to.name && !cachedViews.value.includes(to.name as string)) {
      cachedViews.value.push(to.name as string)
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.content {
  background-color: var(--ant-component-background);
  padding: 18px;
  height: calc(100vh - 64px - 69px); // header高度 + footer高度
  overflow: auto;
  
  .content-wrapper {
    background: var(--mxg-content-color);
    padding: 20px;
    min-height: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #999;
  }
}
</style>