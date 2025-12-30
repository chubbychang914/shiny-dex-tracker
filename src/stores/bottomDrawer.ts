import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DrawerComponentName } from '@/types'

export const useBottomDrawerStore = defineStore('bottomDrawer', () => {
  // ==============================
  // State
  // ==============================
  const isOpen = ref(false)
  const drawerSize = ref<string | number>('40%')
  const currentComponent = ref<DrawerComponentName>(null)

  // ==============================
  // Actions
  // ==============================
  const openDrawer = (componentName: DrawerComponentName = null, size: string | number = '40%') => {
    currentComponent.value = componentName
    drawerSize.value = size
    isOpen.value = true
  }
  const closeDrawer = () => {
    isOpen.value = false
    currentComponent.value = null
  }

  return {
    isOpen,
    drawerSize,
    currentComponent,
    openDrawer,
    closeDrawer
  }
})
