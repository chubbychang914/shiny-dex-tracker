<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonDataStore } from '@/stores/pokemonData.ts'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import PokemonCard from '@/components/PokemonCard.vue'
import _cloneDeep from 'lodash/cloneDeep'

const pokemonDataStore = usePokemonDataStore()
const filterQueriesStore = useFilterQueriesStore()

// ==============================
// Data
// ==============================
const pokemonData = pokemonDataStore.pokemonData

const filteredPokedexData = computed(() => {
  let result = _cloneDeep(pokemonData)

  // 區域選擇
  if (filterQueriesStore.selectedRegion !== 'all') {
    result = result.filter(pokemon => pokemon.generationIntroduced === filterQueriesStore.selectedRegion)
  }

  // 排序選擇
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

  // 搜尋
  if (filterQueriesStore.searchQuery) {
    result = result.filter(pokemon => {
      const matchesName = pokemon.name.includes(filterQueriesStore.searchQuery)
      const matchesDexNumber = pokemon.id.toString().includes(filterQueriesStore.searchQuery)
      return matchesName || matchesDexNumber
    })
  }

  return result
})
</script>

<template>
  <div class="pokedex">
    <div class="pokemon-cards-container">
      <PokemonCard
        v-for="(pokemon) in filteredPokedexData"
        :key="pokemon.id"
        :pokemon-data="pokemon"
      />
    </div>
  </div>
  <el-drawer>
  </el-drawer>
</template>

<style lang="scss" scoped>
.pokedex {
  width: 100%;
  height: 100%;
}
.pokemon-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}
</style>
