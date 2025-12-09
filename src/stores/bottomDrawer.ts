import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBottomDrawerStore = defineStore('bottomDrawer', () => {
  const isOpen = ref(false)
  const toggleDrawer = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    toggleDrawer
  }
})
