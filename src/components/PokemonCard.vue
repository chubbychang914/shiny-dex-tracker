<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const pokemonCardImage = computed(() => {
  // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.singlePokemonData.id}.png`
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${props.singlePokemonData.id}.png`
  // return ''
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
})

// ==============================
// Methods
// ==============================
const handleToggleCaughtStatus = () => {
  const caughtState = toggleCaughtStatus(props.singlePokemonData.id)
  isCaught.value = caughtState
}
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--caught': isCaught }"
    @click="handleToggleCaughtStatus"
  >
    <div class="pokemon-card__header">
      <span>#{{ singlePokemonData.id }}</span>
      <pre>{{ isCaught }}</pre>
    </div>
    <div class="pokemon-card__body">
      <div class="image-container">
        <img
          :src="pokemonCardImage"
          alt="pokemon-card-image"
          loading="lazy"
        />
      </div>
    </div>
    <div class="pokemon-card__footer">
      <span>{{ formatPokemonDisplayName(singlePokemonData) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: calc((100vw - 20px - 20px) / 3);
.pokemon-card {
  display: grid;
  grid-template-rows: 1fr minmax(0, 5fr) 1fr;
  width: $width;
  height: calc($width * 1.2);
  border-radius: 5px;
  background-color: $color-card;
  color: $color-text;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &__header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: $color-text-secondary;
  }
  &__body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-text;
  }
  &__footer {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &--caught {
    background-color: #3dd6d6; // Bright teal
    border: 2px solid #2bc4c4; // Slightly darker teal outline
    box-shadow: 0 0 15px rgba(61, 214, 214, 0.3); // Cyan glow
    color: #1a1d2e; // Dark text for contrast
  }
}
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: contain;
  }
}
</style>
