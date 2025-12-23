<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'

const route = useRoute()
const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()

const gameDexPokemonList = computed(() => {
  const pokemonList = pokeApiDataStore.pokeApiData
  const pokedexName = route.params.pokedexName as string

  return pokemonList.filter((pokemon) => {
    return pokemon.dexMap.hasOwnProperty(pokedexName)
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

<template>
  <div class="game-dex-detail-container">
    <div class="title-container">
      {{ route.params.pokedexName }}
    </div>
    <pre>{{ filteredGameDexPokemonList.map((item) => item.name) }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.game-dex-detail-container {
  width: 100%;
  height: 100%;
  // background-color: blue;
}
</style>
