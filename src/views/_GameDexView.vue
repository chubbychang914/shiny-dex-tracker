<script setup lang="ts">
import { computed } from 'vue'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useRouter } from 'vue-router'

const router = useRouter()
const pokeApiDataStore = usePokeApiDataStore()

const gameDexMap = computed(() => {
  return pokeApiDataStore.referenceData.gameDexMap
})

const navigateToGameDex = (pokedexName: string) => {
  router.push(`/game-dex/${pokedexName}`)
}
</script>

<template>
  <div class="game-selection-container">
    <div class="title-container">
      <div
        class="title"
        v-for="game in gameDexMap"
        :key="game.id"
        @click="navigateToGameDex(game.pokedexName)"
      >
        {{ game.displayName }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-selection-container {
  width: 100%;
  height: 100%;
  // background-color: green;
  overflow: auto;
}
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.title {
  background-color: red;
  padding: 10px 20px;
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
</style>
