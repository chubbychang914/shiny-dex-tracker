<template>
  <div class="national-dex-view">
    <button @click="handleChangeLayoutType">changeLayoutType</button>
    <div
      v-show="filteredPokedexData.length"
      class="pokemon-cards-container"
      :class="{
        'three-row-layout': layoutType === 'default',
        'six-row-layout': layoutType === 'mini'
      }"
      ref="containerRef"
    >
      <div
        class="pokemon-cards-container__inner"
        v-for="pokemon in displayedPokedexData"
        :key="pokemon.id"
      >
        <PokemonCard
          :single-pokemon-data="pokemon"
          :layout-type="layoutType"
        />
      </div>
      <div
        v-show="hasMore"
        class="sentinel"
        ref="sentinelRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import { useLayoutStore } from '@/stores/layout.ts'
import PokemonCard from '@/components/molecules/cards/PokemonCard.vue'

const pokeApiDataStore = usePokeApiDataStore()
const filterQueriesStore = useFilterQueriesStore()

// ******************************
// INTERSECTION OBSERVER SETUP
// ******************************
const INITIAL_BATCH_SIZE = 36 // first load 36 cards
const ITEMS_PER_BATCH = 24 // load 24 cards each batch when sentinel hit
const displayCount = ref<number>(INITIAL_BATCH_SIZE) // how many cards are shown
const sentinelRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// ******************************
// DATA
// ******************************
const isLoading = ref(false)
const layoutType = ref<'default' | 'mini'>('mini')

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

/* Display data based on batch size **/
const displayedPokedexData = computed(() => {
  return filteredPokedexData.value.slice(0, displayCount.value)
})

// Determines if filtered data has more items to load (displayCount will increment by ITEMS_PER_BATCH)
const hasMore = computed(() => {
  return displayCount.value < filteredPokedexData.value.length
})

// ******************************
// WATCH
// ******************************
/* when filter queries change, scroll to top and show displayed cards **/
// watch(
//   filterQueriesStore.$state,
//   () => {
//     window.scrollTo({ top: 0, behavior: 'instant' })
//     displayCount.value = INITIAL_BATCH_SIZE
//   },
//   { deep: true }
// )

// ******************************
// METHODS
// ******************************
// load more batch of cards when sentinel is visible
const loadMore = () => {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true
  displayCount.value += ITEMS_PER_BATCH
  isLoading.value = false
}

// if sentinel is visible, but not all cards are visible, load more cards
const ensureViewportFilled = () => {
  const checkSentinel = () => {
    const containerRect = containerRef?.value?.getBoundingClientRect()
    const sentinelRect = sentinelRef?.value?.getBoundingClientRect()
    const isVisible = sentinelRect?.top < containerRect?.bottom

    if (isVisible) {
      displayCount.value += ITEMS_PER_BATCH
      requestAnimationFrame(() => {
        checkSentinel()
      })
    }
  }

  setTimeout(checkSentinel, 100)
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
      root: containerRef.value, // uses viewport as boundary
      rootMargin: '100px', // trigger when sentinel is 100px BEFORE entering viewport
      threshold: 0 // trigger when sentinel is visible
    }
  )
  observer.observe(sentinelRef.value)
}

const handleChangeLayoutType = () => {
  layoutType.value = layoutType.value === 'default' ? 'mini' : 'default'
}

// ******************************
// LIFECYCLE HOOKS
// ******************************
onMounted(() => {
  setUpObserver()
  ensureViewportFilled()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style lang="scss" scoped>
.national-dex-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.pokemon-cards-container {
  width: 100%;
  max-height: 100%;
  display: grid;
  padding: 20px 15px 40px;
  overflow-y: auto;
  justify-items: stretch;

  &.three-row-layout {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
  }

  &.six-row-layout {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;
  }

  &__inner {
    width: 100%;
    aspect-ratio: 1/1;
  }
}

.sentinel {
  height: 1px;
  grid-column: 1 / -1;
  background-color: blue;
}
</style>
