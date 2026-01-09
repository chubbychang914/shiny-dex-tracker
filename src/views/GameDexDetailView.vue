<template>
  <div class="game-dex-detail-view">
    <DexLayout
      v-if="filteredPokedexData.length"
      :pokemon-list="filteredPokedexData"
    />
    <NoDataLayout v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import { getSingleDexFilter } from '@/utils/localStorageDB/dexFilters.ts'
import type { DexFiltersType } from '@/types'
import DexLayout from '@/components/organisms/layouts/DexLayout.vue'
import NoDataLayout from '@/components/organisms/layouts/NoDataLayout.vue'

defineOptions({
  name: 'GameDexDetailView' // for keep-alive
})

// ******************************
// SETUP
// ******************************
const route = useRoute()
const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()
const pokedexName = computed(() => route.params.pokedexName as string) // 'kanto', 'kitakami', etc.
const DEFAULT_FILTERS = {
  sortBy: 'number-asc',
  regions: [],
  types: []
} as DexFiltersType

// ******************************
// COMPUTED
// ******************************
// initial filter to only show pokemon in the selected game dex
const gameDexPokemonList = computed(() => {
  const allPokemonList = pokeApiDataStore.pokeApiData

  return allPokemonList.filter((pokemon) => {
    return pokemon.dexMap.hasOwnProperty(pokedexName.value)
  })
})

const filteredPokedexData = computed(() => {
  let result = gameDexPokemonList.value

  // 1. Filter by regions
  if (filterQueriesStore.selectedRegions.length > 0) {
    result = result.filter((pokemon) => {
      return filterQueriesStore.selectedRegions.includes(pokemon.generationIntroduced)
    })
  }

  // 2. Filter by types
  if (filterQueriesStore.selectedTypes.length > 0) {
    result = result.filter((pokemon) => {
      return pokemon.types.some((type) => filterQueriesStore.selectedTypes.includes(type))
    })
  }

  // 3. Filter by search query
  if (filterQueriesStore.searchQuery) {
    const normalizedSearchQuery = filterQueriesStore.searchQuery // Remove all hyphens and spaces (example: iron-valiant -> ironvaliant)
      .replace(/[-\s]/g, '')
      .toLowerCase()

    result = result.filter((pokemon) => {
      const normalizedPokemonName = pokemon.name.replace(/[-\s]/g, '').toLowerCase()

      const matchesName = normalizedPokemonName.includes(normalizedSearchQuery)
      const matchesDexNumber = pokemon.id.toString().includes(normalizedSearchQuery)

      return matchesName || matchesDexNumber
    })
  }

  // 4. Sort by selected sort option -> now sorting by filtered data instead of all data
  switch (filterQueriesStore.selectedSortOption) {
    case 'number-asc':
      result.sort((a, b) => a.id - b.id)
      break
    case 'number-desc':
      result.sort((a, b) => b.id - a.id)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      result.sort((a, b) => a.id - b.id)
      break
  }

  return result
})

// ******************************
// METHODS
// ******************************
const loadSavedGameDexFilter = () => {
  const pokedexName = route.params.pokedexName as string
  const savedFilter = getSingleDexFilter(pokedexName) || DEFAULT_FILTERS

  // set saved filter or reset to default
  filterQueriesStore.setSelectedSortOption(savedFilter.sortBy)
  filterQueriesStore.setSelectedRegion(savedFilter.regions)
  filterQueriesStore.setSelectedTypes(savedFilter.types)
}

// ******************************
// WATCHERS
// ******************************
watch(
  () => route.params.pokedexName,
  (newVal) => {
    if (!newVal) return
    console.log('pokedexName changed', newVal)
    loadSavedGameDexFilter()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.game-dex-detail-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
