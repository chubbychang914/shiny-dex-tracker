import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DrawerComponentName } from '@/types'

export const useBottomDrawerStore = defineStore('bottomDrawer', () => {
  // State
  const isOpen = ref(false)
  const currentComponent = ref<DrawerComponentName>(null)

  // Actions
  const openDrawer = (componentName: DrawerComponentName = null) => {
    currentComponent.value = componentName
    isOpen.value = true
  }
  const closeDrawer = () => {
    isOpen.value = false
    currentComponent.value = null
  }

  return {
    isOpen,
    currentComponent,
    openDrawer,
    closeDrawer
  }
})
