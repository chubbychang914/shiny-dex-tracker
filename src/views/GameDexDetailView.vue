<template>
  <div class="game-dex-detail-view">
    <DexLayout :pokemon-list="filteredGameDexPokemonList" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import DexLayout from '@/components/organisms/layouts/DexLayout.vue'

defineOptions({
  name: 'GameDexDetailView'
})

const route = useRoute()
const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()

const gameDexPokemonList = computed(() => {
  const pokemonList = pokeApiDataStore.pokeApiData
  const pokedexName = route.params.pokedexName

  return pokemonList.filter((pokemon) => {
    return pokemon.dexMap.hasOwnProperty(pokedexName as string)
  })
})

const filteredGameDexPokemonList = computed(() => {
  let result = gameDexPokemonList.value
  if (filterQueriesStore.searchQuery) {
    const normalizedSearchQuery = filterQueriesStore.searchQuery // Remove all hyphens and spaces (example: iron-valiant -> ironvaliant)
      .replace(/[-\s]/g, '')
      .toLowerCase()

    result = result.filter((pokemon) => {
      const normalizedPokemonName = pokemon.name.replace(/[-\s]/g, '').toLowerCase()
      return normalizedPokemonName.includes(normalizedSearchQuery)
    })
  }
  return result
})
</script>

<style lang="scss" scoped>
.game-dex-detail-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
