<template>
  <div class="pokemon-card-container">
    <div
      class="pokemon-card"
      :class="{
        'is-caught': isCaught,
        'card-layout-default': layoutType === 'default',
        'card-layout-mini': layoutType === 'mini'
      }"
      @click="handleToggleCaughtStatus"
    >
      <div class="slide-in top"></div>
      <div class="slide-in bottom"></div>
      <div
        class="pokemon-card__header"
        v-show="layoutType === 'default'"
      >
        <span>#{{ singlePokemonData.id }}</span>
      </div>
      <div class="pokemon-card__body">
        <div class="image-container">
          <img
            :src="pokemonCardImage"
            alt="front-card-image"
            loading="lazy"
          />
        </div>
      </div>
      <div
        class="pokemon-card__footer"
        v-show="layoutType === 'default'"
      >
        <span :style="{ 'font-size': nameFontSize }">{{ pokemonDisplayName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { formatPokemonDisplayName } from '@/utils/helpers.ts'
import type { StructuredPokemonData, CaughtPokemonData } from '@/types/index.ts'
import { toggleCaughtStatus, loadFromStorage } from '@/utils/localStorageDB/caughtPokemonData.ts'

// ******************************
// Props
// ******************************
const props = defineProps<{
  singlePokemonData: StructuredPokemonData
  layoutType: string // 'default' or 'mini'
}>()

// ******************************
// Data
// ******************************
const isCaught = ref(false)

const pokemonCardImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.singlePokemonData.id}.png`
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

// ******************************
// Lifecycle Hooks
// ******************************
onMounted(() => {
  const storedData: Record<number, CaughtPokemonData> = loadFromStorage()
  const singleData = storedData[props.singlePokemonData.id]
  if (singleData) {
    isCaught.value = true
  }
})

// ******************************
// Methods
// ******************************
const handleToggleCaughtStatus = () => {
  const caughtState = toggleCaughtStatus(props.singlePokemonData.id)
  isCaught.value = caughtState
}
</script>

<style lang="scss" scoped>
$borderRadius: 10px;
.pokemon-card-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: $borderRadius;
}

.pokemon-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  border-radius: $borderRadius;
  border: 1px solid black;

  &.card-layout-default {
    grid-template-rows: minmax(0, 1fr) minmax(0, 4fr) minmax(0, 1fr);
  }

  &.card-layout-mini {
    grid-template-rows: minmax(0, 1fr);
  }

  &__header,
  &__body,
  &__footer {
    width: 100%;
    position: relative;
    z-index: 2;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    padding: 5px;
    @extend %center;
  }

  &__footer {
    transition: color 0.3s ease;
    @extend %center;
  }

  .slide-in {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50%;
    transition: transform 0.25s ease-out;
    opacity: 0.6;
    &.top {
      top: 0;
      background-color: $SystemPokeballRed;
      transform: translateY(-100%);
      transform-origin: bottom center;
      border-bottom: 6px solid black;
    }
    &.bottom {
      bottom: 0;
      background-color: $SystemWhite;
      transform: translateY(100%);
      transform-origin: top center;
      border-top: 6px solid black;
    }
  }
}

.image-container {
  width: 100%;
  height: 100%;
  @extend %center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: filter 0.3s ease;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
  }
}

.is-caught {
  .pokemon-card__footer {
    color: $SystemBlack;
  }

  .slide-in {
    &.top,
    &.bottom {
      transform: translateY(0);
    }
  }

  .image-container img {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.8));
  }
}

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
