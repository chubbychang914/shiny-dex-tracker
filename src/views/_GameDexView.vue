<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { REFERENCE_DATA } from '@/constants/referenceData'

const router = useRouter()

const gameDexMap = computed(() => {
  return REFERENCE_DATA.gameDexMap.filter((game) => game.pokedexName !== 'national').sort((a, b) => a.order - b.order)
})

const navigateToGameDex = (pokedexName: string) => {
  router.push(`/game-dex/${pokedexName}`)
}
</script>

<template>
  <div class="game-dex-view">
    <div class="title-container">
      <div
        class="title"
        v-for="game in gameDexMap"
        :key="game.pokedexName"
        @click="navigateToGameDex(game.pokedexName)"
      >
        {{ `${game.displayName} Pokedex` }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-dex-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.title-container {
  width: 100%;
  max-height: 100%;
  padding: 10px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
}
.title {
  background-color: $NavbarBg;
  width: 100%;
  min-height: 50px;
  border-radius: 10px;
  display: flex;
  font-size: 1.2rem;
  font-weight: bold;
  color: $TextPrimary;
  cursor: pointer;
}
</style>
