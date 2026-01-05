<template>
  <div class="dex-layout">
    <div
      v-show="pokemonList.length"
      class="pokemon-cards-container"
      :class="{
        'three-row-layout': layoutType === 'default',
        'six-row-layout': layoutType === 'mini'
      }"
      ref="containerRef"
    >
      <div
        class="pokemon-cards-container__inner"
        v-for="pokemon in displayedPokemonList"
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
import { useLayoutStore } from '@/stores/userPreferences/layout'
import type { StructuredPokemonData } from '@/types/index.ts'
import PokemonCard from '@/components/molecules/cards/PokemonCard.vue'

const layoutStore = useLayoutStore()

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
// PROPS
// ******************************
const props = defineProps<{
  pokemonList: StructuredPokemonData[]
}>()

// ******************************
// DATA
// ******************************
const isLoading = ref(false)
const layoutType = computed(() => layoutStore.gridLayoutType)

// ******************************
// COMPUTED
// ******************************
const displayedPokemonList = computed(() => {
  return props.pokemonList.slice(0, displayCount.value)
})

// ******************************
// WATCH
// ******************************
watch(layoutType, () => {
  if (observer && sentinelRef.value) {
    observer.disconnect()
    observer.observe(sentinelRef.value)
  }

  setTimeout(() => {
    ensureViewportFilled()
  }, 100)
})
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
// INFINITE SCROLL
// ******************************
// determines if pokemon list has more items to load (displayCount will increment by ITEMS_PER_BATCH)
const hasMore = computed(() => {
  return displayCount.value < props.pokemonList.length
})

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
      rootMargin: '200px', // trigger when sentinel is 100px BEFORE entering viewport
      threshold: 0 // trigger when sentinel is visible
    }
  )
  observer.observe(sentinelRef.value)
}

// if initial viewport is not filled, load more cards
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

// load more batch of cards when sentinel is visible
const loadMore = () => {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true
  displayCount.value += ITEMS_PER_BATCH
  isLoading.value = false
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
.dex-layout {
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
    gap: 10px;
  }

  &.six-row-layout {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 5px;
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
