<template>
  <div class="app-layout">
    <NavbarLayout />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <keep-alive :include="['NationalDexView', 'GameDexDetailView']">
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </main>
    <FooterLayout />
    <!-- GLOBAL DRAWER -->
    <el-drawer
      v-model="bottomDrawerStore.isOpen"
      direction="btt"
      :size="bottomDrawerStore.drawerSize"
      :destroy-on-close="true"
      :with-header="false"
      @closed="bottomDrawerStore.closeDrawer()"
    >
      <component
        v-if="bottomDrawerStore.currentComponent"
        :is="drawerComponents[bottomDrawerStore.currentComponent]"
      />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useBottomDrawerStore } from './stores/bottomDrawer.ts'
import NavbarLayout from '@/components/organisms/layouts/NavbarLayout.vue'
import FooterLayout from '@/components/organisms/layouts/FooterLayout.vue'

const bottomDrawerStore = useBottomDrawerStore()

// 當有新的 drawer 樣式，需要在此處新增
const drawerComponents = {
  'advanced-filters': defineAsyncComponent(() => import('@/components/organisms/drawers/AdvancedFilters.vue'))
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  height: 100dvh;
  background-color: $BgPrimary;
  overflow: hidden;
}

.main-content {
  width: 100%;
  background-color: $BgPrimary;
  overflow-y: auto;
  overflow-x: hidden;
}

:deep(.el-overlay) {
  z-index: 9999 !important;
}

:deep(.el-drawer) {
  z-index: 10000 !important;
}

:deep(.el-drawer__body) {
  padding: 0px;
  background-color: $BgPrimary;
  color: $TextPrimary;
}
</style>
