import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // 主题模式：light | dark
  const themeMode = ref<'light' | 'dark'>('light')

  // 计算属性：是否为暗色主题
  const isDarkTheme = computed({
    get: () => themeMode.value === 'dark',
    set: (val) => {
      themeMode.value = val ? 'dark' : 'light'
      applyTheme()
    }
  })

  // 初始化主题（从本地存储或系统偏好）
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      themeMode.value = savedTheme === 'dark' ? 'dark' : 'light'
    } else {
      themeMode.value = prefersDark ? 'dark' : 'light'
    }
    
    applyTheme()
  }

  // 应用主题到DOM
  const applyTheme = () => {
    if (themeMode.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', themeMode.value)
  }

  // 切换主题
  const toggleTheme = () => {
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
    applyTheme()
  }

  // 设置特定主题
  const setTheme = (mode: 'light' | 'dark') => {
    themeMode.value = mode
    applyTheme()
  }

  // 监听主题变化并应用
  watch(themeMode, applyTheme, { flush: 'post' })

  return { themeMode, isDarkTheme, initTheme, toggleTheme, setTheme }
})