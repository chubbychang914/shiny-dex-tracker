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
    <div class="favorite-container">
      <div class="circle"></div>
    </div>
    <div class="progress-tracker">
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
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
}
.favorite-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle {
  width: 50%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  outline: 1px solid red;
}
</style>
