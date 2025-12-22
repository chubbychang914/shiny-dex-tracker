<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToNationalDex = () => {
  router.push('/national-dex')
}
const navigateToGameDex = () => {
  router.push('/game-dex')
}
</script>

<template>
  <div class="home-container">
    <div
      class="title-container"
      @click="navigateToNationalDex"
    >
      <div class="title">National Dex</div>
    </div>
    <div
      class="title-container"
      @click="navigateToGameDex"
    >
      <div class="title">Game Dex</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color-background;
}
</style>
