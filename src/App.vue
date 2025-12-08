<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/layouts/Navbar.vue'
import Footer from './components/layouts/Footer.vue'
</script>

<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding-top: 56px;
  padding-bottom: 60px;
  background: lightgreen;
}
</style>