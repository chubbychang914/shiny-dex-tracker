<template>
  <div class="national-dex-view">
    <DexLayout :pokemon-list="filteredPokedexData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import DexLayout from '@/components/organisms/layouts/DexLayout.vue'

defineOptions({
  name: 'NationalDexView'
})

const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()

// ******************************
// COMPUTED
// ******************************
/* Filtered data **/
const filteredPokedexData = computed(() => {
  let result = pokeApiDataStore.pokeApiData

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

  // 2. Filter by search query
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

  // 3. Copy only if we haven't filtered (filter returns new array already)
  if (result === pokeApiDataStore.pokeApiData) {
    result = [...result]
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
</script>

<style lang="scss" scoped>
.national-dex-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
