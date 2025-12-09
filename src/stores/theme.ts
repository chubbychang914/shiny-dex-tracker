import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Theme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref<Theme>(
    (localStorage.getItem('theme') as Theme) || 'dark'
  )
  // Actions
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
  // Watch
  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }, { immediate: true })

  return {
    currentTheme,
    setTheme
  }
})
