<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { formatPokemonDisplayName } from '@/utils/helpers.ts'
import type { StructuredPokemonData, CaughtPokemonData } from '@/types/index.ts'
import { toggleCaughtStatus, loadFromStorage } from '@/utils/localStorageDB/caughtPokemonData.ts'

// ==============================
// Props
// ==============================
const props = defineProps<{
  singlePokemonData: StructuredPokemonData
}>()

// ==============================
// Data
// ==============================
const isCaught = ref(false)
const isInitialLoad = ref(true)

const pokemonCardImage = computed(() => {
  // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.singlePokemonData.id}.png`
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${props.singlePokemonData.id}.png`
  // return ''
})

const pokemonCardImageBack = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${props.singlePokemonData.id}.png`
})

const getTypeIconPath = (type: string) => {
  return new URL(`../assets/images/typeIcons/${type}.png`, import.meta.url).href
}

// ==============================
// Lifecycle Hooks
// ==============================
onMounted(() => {
  const storedData: Record<number, CaughtPokemonData> = loadFromStorage()
  const singleData = storedData[props.singlePokemonData.id]
  if (singleData) {
    isCaught.value = true
  }
  nextTick(() => {
    requestAnimationFrame(() => {
      isInitialLoad.value = false
    })
  })
})

// ==============================
// Methods
// ==============================
const handleToggleCaughtStatus = () => {
  const caughtState = toggleCaughtStatus(props.singlePokemonData.id)
  isCaught.value = caughtState
}

const handleImageError = (event: Event, id: number) => {
  const target = event.target as HTMLImageElement
  target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
}
</script>

<template>
  <div class="pokemon-card-container">
    <div
      class="pokemon-card"
      :class="{
        'pokemon-card__flipped': isCaught,
        'pokemon-card__no-animation': isInitialLoad
      }"
      @click="handleToggleCaughtStatus"
    >
      <!-- Front Card -->
      <div class="pokemon-card-face front-card">
        <div class="front-card__header">
          <span>#{{ singlePokemonData.id }}</span>
        </div>
        <div class="front-card__body">
          <div class="image-container">
            <img
              :src="pokemonCardImage"
              alt="front-card-image"
              loading="lazy"
            />
          </div>
        </div>
        <div class="front-card__footer">
          <span>{{ formatPokemonDisplayName(singlePokemonData) }}</span>
        </div>
      </div>
      <!-- Back Card -->
      <div class="pokemon-card-face back-card">
        <div class="back-card__header">
          <!-- <span>#{{ singlePokemonData.id }}</span> -->
        </div>
        <div class="back-card__body">
          <div class="image-container">
            <img
              :src="pokemonCardImageBack"
              alt="back-card-image"
              loading="lazy"
              @error="handleImageError($event, singlePokemonData.id)"
            />
          </div>
        </div>
        <div class="back-card__footer">
          <span>{{ formatPokemonDisplayName(singlePokemonData) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: calc((100vw - 20px - 20px) / 3);
$height: calc($width * 1);

.pokemon-card-container {
  // perspective container, make child elements have 3D effect
  width: $width;
  height: $height;
  perspective: 1000px;
}

.pokemon-card {
  // card flip container
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &__flipped {
    transform: rotateY(180deg);
  }
  &__no-animation {
    transition: none;
  }
}

.pokemon-card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; // hide back side
  -webkit-backface-visibility: hidden; // Safari support
  border-radius: 10px;
  display: block;
}

.front-card {
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 5fr) minmax(0, 1fr);
  background-color: $color-card;
  color: $color-text;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-text-secondary;
  }

  &__body {
    width: 100%;
    @extend %center;
  }

  &__footer {
    width: 100%;
    @extend %center;
  }
}

.back-card {
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 5fr) minmax(0, 1fr);
  transform: rotateY(180deg);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -25%;
    left: 25%;
    width: 150%;
    aspect-ratio: 1/1;
    background-image: url('@/assets/images/pokeballIcon.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5; // 調整這個值，例如 0.2 (更透明) 或 0.5 (較不透明)
    z-index: -1;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-text;
  }

  &__body {
    width: 100%;
    @extend %center;
  }

  &__footer {
    width: 100%;
    @extend %center;
  }
}

// ==============================
// Shared Styles
// ==============================

.image-container {
  width: 100%;
  height: 100%;
  @extend %center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
