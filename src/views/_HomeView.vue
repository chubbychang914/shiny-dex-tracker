<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToNationalDex = () => {
  router.push('/national-dex')
}
const navigateToGameDex = () => {
  router.push('/game-dex')
}

const pinnedPokemonGif = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/10195.gif`
})
</script>

<template>
  <div class="home-container">
    <div class="pinned-container">
      <div class="pinned-image-container">
        <img
          :src="pinnedPokemonGif"
          alt="gif"
        />
      </div>
    </div>
    <div class="progress-tracker">
      <div
        class="title-container"
        @click="navigateToNationalDex"
      >
        <div class="title">National Dex</div>
        <el-progress
          :text-inside="true"
          :stroke-width="15"
          :percentage="70"
        />
      </div>
      <div
        class="title-container"
        @click="navigateToGameDex"
      >
        <div class="title">Game Dex</div>
        <el-progress
          :text-inside="true"
          :stroke-width="15"
          :percentage="15"
        />
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
.pinned-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
}
.pinned-image-container {
  width: 20%;
  max-width: 200px;
  border: 1px solid blue;
  padding: 10px;
  border-radius: 50%;
  height: auto;
  aspect-ratio: 1/1;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
