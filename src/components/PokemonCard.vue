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
  return ''
})

const pokemonDisplayName = computed(() => {
  return formatPokemonDisplayName(props.singlePokemonData)
})

const nameFontSize = computed(() => {
  const length = pokemonDisplayName.value.length
  if (length > 20) {
    return '0.7rem'
  } else if (length > 15) {
    return '0.8rem'
  } else if (length > 10) {
    return '0.9rem'
  }
  return '1rem'
})

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
          <span :style="{ 'font-size': nameFontSize }">{{ pokemonDisplayName }}</span>
        </div>
      </div>
      <!-- Back Card -->
      <div class="pokemon-card-face back-card">
        <div class="back-card__header">
          <span>#{{ singlePokemonData.id }}</span>
        </div>
        <div class="back-card__body">
          <div class="image-container">
            <img
              :src="pokemonCardImage"
              alt="back-card-image"
              loading="lazy"
              @error="handleImageError($event, singlePokemonData.id)"
            />
          </div>
        </div>
        <div class="back-card__footer">
          <span :style="{ 'font-size': nameFontSize }">{{ pokemonDisplayName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: calc((100vw - 20px - 20px) / 3); // gap size * 2 + container padding * 2 = 40px
$height: calc($width * 1);

.pokemon-card-container {
  // perspective container, make child elements have 3D effect
  width: $width;
  height: $height;
  perspective: 1000px;
  overflow: hidden;
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
  grid-template-rows: minmax(0, 1fr) minmax(0, 4fr) minmax(0, 1fr);
  background-color: $BgPrimary;
  color: $TextPrimary;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: red;
  }

  &__body {
    width: 100%;
    padding: 5px;
    @extend %center;
  }

  &__footer {
    width: 100%;
    @extend %center;
  }
}

.back-card {
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 4fr) minmax(0, 1fr);
  transform: rotateY(180deg);
  overflow: hidden;

  // liquid glass effect
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: url('@/assets/images/pokeballIcon.svg');
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
    z-index: -1;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $TextPrimary;
  }

  &__body {
    width: 100%;
    padding: 5px;
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
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8)); // Strong dark shadow
  }
}

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
