<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import PokemonCard from '@/components/PokemonCard.vue'

const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()

// ==============================
// Computed
// ==============================
const filteredPokedexData = computed(() => {
  let result = [...pokeApiDataStore.pokeApiData]

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
      // Remove all hyphens and spaces (example: iron-valiant -> ironvaliant)
      const normalizedPokemonName = pokemon.name.replace(/[-\s]/g, '').toLowerCase()
      const normalizedSearchQuery = filterQueriesStore.searchQuery.replace(/[-\s]/g, '').toLowerCase()

      const matchesName = normalizedPokemonName.includes(normalizedSearchQuery)
      const matchesDexNumber = pokemon.id.toString().includes(normalizedSearchQuery)

      return matchesName || matchesDexNumber
    })
  }

  return result
})

const listKey = computed(() => {
  return JSON.stringify(filterQueriesStore.$state)
})

// ==============================
// Methods
// ==============================
const handleTransitionAfterLeave = () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
}
</script>

<template>
  <div class="pokedex">
    <Transition
      name="fade"
      mode="out-in"
      @after-leave="handleTransitionAfterLeave">
      <div
        v-if="filteredPokedexData.length"
        :key="listKey"
        class="pokemon-cards-container">
        <PokemonCard
          v-for="(pokemon) in filteredPokedexData"
          :key="pokemon.id"
          :single-pokemon-data="pokemon"
        />
      </div>
    </Transition>
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

.fade-enter-active {
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
}
.fade-leave-active {
  transition: opacity 0.15s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
}
</style>
