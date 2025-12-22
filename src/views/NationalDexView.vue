<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import PokemonCard from '@/components/PokemonCard.vue'

const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()

// ==============================
// INTERSECTION OBSERVER SETUP
// ==============================
const INITIAL_BATCH_SIZE = 36 // first load 36 cards
const ITEMS_PER_BATCH = 18 // load 18 cards each batch when sentinel hit
const displayCount = ref<number>(INITIAL_BATCH_SIZE) // how many cards are shown
const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// ==============================
// DATA
// ==============================
const isLoading = ref(false)

// ==============================
// COMPUTED
// ==============================
/* Filtered data **/
const filteredPokedexData = computed(() => {
  let result = pokeApiDataStore.pokeApiData

  // 1. Filter by region
  if (filterQueriesStore.selectedRegion !== 'all') {
    result = result.filter((pokemon) => pokemon.generationIntroduced === filterQueriesStore.selectedRegion)
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

/* Display data based on batch size **/
const displayedPokedexData = computed(() => {
  return filteredPokedexData.value.slice(0, displayCount.value)
})

/* Determines if filtered data has more items to load (displayCount will increment by ITEMS_PER_BATCH) **/
const hasMore = computed(() => {
  return displayCount.value < filteredPokedexData.value.length
})

// ==============================
// WATCH
// ==============================
/* when filter queries change, scroll to top and show displayed cards **/
watch(
  filterQueriesStore.$state,
  () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    displayCount.value = INITIAL_BATCH_SIZE
  },
  { deep: true }
)

// ==============================
// METHODS
// ==============================
/* load more batch of cards when sentinel is visible **/
const loadMore = () => {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true
  displayCount.value += ITEMS_PER_BATCH
  isLoading.value = false
}

const setUpObserver = () => {
  if (!sentinelRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting && hasMore.value) {
        loadMore()
      }
    },
    {
      root: null, // uses viewport as boundary
      rootMargin: '100px', // trigger when sentinel is 100px BEFORE entering viewport
      threshold: 0 // trigger when 10% of the sentinel is visible
    }
  )
  observer.observe(sentinelRef.value)
}

// ==============================
// LIFECYCLE HOOKS
// ==============================
onMounted(() => {
  setUpObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div class="pokedex">
    <div
      v-if="filteredPokedexData.length"
      class="pokemon-cards-container"
    >
      <PokemonCard
        v-for="pokemon in displayedPokedexData"
        :key="pokemon.id"
        :single-pokemon-data="pokemon"
        v-loading="isLoading"
      />
    </div>
    <div
      v-show="hasMore"
      ref="sentinelRef"
    />
  </div>
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
