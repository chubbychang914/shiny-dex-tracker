<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavbarLayout from './components/layouts/NavbarLayout.vue'
import { useBottomDrawerStore } from './stores/bottomDrawer.ts'
import { usePokemonDataStore } from './stores/pokemonData.ts'

const bottomDrawerStore = useBottomDrawerStore()
const pokemonDataStore = usePokemonDataStore()

// 當有新的 drawer 樣式，需要在此處新增
const drawerComponents = {
  'settings': defineAsyncComponent(() => import('@/components/SettingsPage.vue')),
  'advanced-filters': defineAsyncComponent(() => import('@/components/AdvancedFilters.vue'))
}

onMounted(async() => {
  await pokemonDataStore.initData()
  console.log('🔍 pokemonDataStore.pokemonData', pokemonDataStore.pokemonData)
  console.log('🔍 pokemonDataStore.referenceData', pokemonDataStore.referenceData)
})
</script>

<template>
  <div class="app-layout">
    <NavbarLayout />
    <main class="main-content">
      <RouterView />
      <el-backtop :bottom="50" :right="12" />
    </main>
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

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $color-background;
}
.main-content {
  flex: 1;
  padding-top: 5px;
  padding-bottom: 60px;
  background-color: $color-background;
}
:deep(.el-drawer__body) {
  padding: 10px;
  background-color: $color-drawer-background;
  color: $color-text;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
:deep(.el-drawer.btt) {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
