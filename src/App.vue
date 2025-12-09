<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavbarLayout from './components/layouts/NavbarLayout.vue'
</script>

<template>
  <div class="app-layout">
    <NavbarLayout />
    <main class="main-content">
      <RouterView />
      <el-backtop :bottom="50" :right="12" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding-top: 5px;
  padding-bottom: 60px;
}
</style>
