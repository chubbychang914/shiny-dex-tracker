<script setup lang="ts">
import { ref, computed } from 'vue'
import { capitalizeFirstLetter } from '@/utils/helpers.ts'
import type { StructuredPokemonData } from '@/types/index.ts'

// ==============================
// Props
// ==============================
const props = defineProps<{
  singlePokemonData: StructuredPokemonData
}>()

// ==============================
// Data
// ==============================
const isCaptured = ref(false)

const pokemonCardName = computed(() => {
  let displayName = props.singlePokemonData.name
  // if contains variant, remove the hyphen (example: deoxys-normal -> deoxys)
  if (props.singlePokemonData.variants.length > 1) {
    displayName = props.singlePokemonData.name.split('-')[0] ?? props.singlePokemonData.name
  }
  // if contains hyphen, remove hyphen and capitalize each word (example: iron-valiant -> Iron Valiant)
  displayName = displayName
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ')

  return displayName
})

const pokemonCardImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.singlePokemonData.id}.png`
  // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${props.singlePokemonData.id}.png`
  // return ''
})
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--captured': isCaptured }"
    @click="isCaptured = !isCaptured"
  >
    <div class="pokemon-card__header">
      <span>#{{ singlePokemonData.id }}</span>
      <pre>{{ isCaptured }}</pre>
    </div>
    <div class="pokemon-card__body">
      <div class="image-container">
        <img
          :src="pokemonCardImage"
          alt="pokemon-card-image"
          loading="lazy" />
      </div>
    </div>
    <div class="pokemon-card__footer">
      <span>{{ pokemonCardName }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: calc((100vw - 20px - 20px) / 3);
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: $width;
  height: calc($width * 1.4);
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
    flex: 5;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-text;
  }
  &__footer {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &--captured {
    background-color: $color-selected-card;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: contain;
    border-radius: 50%;
  }
}
</style>
