import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  // ******************************
  // STATE
  // ******************************
  const gridLayoutType = ref<string>('default')

  // ******************************
  // ACTIONS
  // ******************************
  const toggleGridLayoutType = () => {
    gridLayoutType.value = gridLayoutType.value === 'default' ? 'mini' : 'default'
  }

  return {
    gridLayoutType,
    toggleGridLayoutType
  }
})
