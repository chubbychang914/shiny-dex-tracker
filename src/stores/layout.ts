import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  // State
  const layoutType = ref<string>('default')

  // Actions
  const setLayoutType = (type: string) => {
    layoutType.value = type
  }

  return {
    layoutType,
    setLayoutType
  }
})
