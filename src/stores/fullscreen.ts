import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFullscreen } from '@vueuse/core'

export const useFullscreenStore = defineStore('fullscreen', () => {
  // 全屏状态
  const isFullscreen = ref(false)
  
  // 使用 vueuse 的 useFullscreen
  const { isFullscreen: isFullscreenRef, toggle, enter, exit } = useFullscreen()

  // 同步状态
  watch(isFullscreenRef, (newValue) => {
    isFullscreen.value = newValue
  }, { immediate: true })

  // 监听 store 状态变化并同步到 vueuse
  watch(isFullscreen, (newValue) => {
    if (newValue !== isFullscreenRef.value) {
      if (newValue) {
        enter()
      } else {
        exit()
      }
    }
  })

  return { 
    isFullscreen,
    toggle,
    enter,
    exit
  }
})