import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Theme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  // ******************************
  // STATE
  // ******************************
  const currentTheme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'pokeball')

  // ******************************
  // ACTIONS
  // ******************************
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
  }

  // ******************************
  // WATCH
  // ******************************
  watch(
    currentTheme,
    (newTheme) => {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    },
    { immediate: true }
  )

  return {
    currentTheme,
    setTheme
  }
})
