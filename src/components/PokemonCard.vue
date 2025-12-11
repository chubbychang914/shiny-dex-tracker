<script setup lang="ts">
import { ref, computed } from 'vue'
import { capitalizeFirstLetter } from '@/utils/helpers.ts'
import type { StructuredPokemonData } from '@/types/index.ts'

// ==============================
// Props
// ==============================
const props = defineProps<{
  pokemonData: StructuredPokemonData
}>()

// ==============================
// Data
// ==============================
const isCaptured = ref(false)

const pokemonCardImage = computed(() => {
  // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.pokemonData.id}.png`
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${props.pokemonData.id}.png`
})
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--captured': isCaptured }"
    @click="isCaptured = !isCaptured"
  >
    <div class="pokemon-card__header">
      <span>#{{ pokemonData.id }}</span>
      <span>{{ capitalizeFirstLetter(pokemonData.generationIntroduced) }}</span>
    </div>
    <div class="pokemon-card__body">
      <el-image
        :src="pokemonCardImage"
        class="pokemon-card__image"
        lazy />
      <span>{{ capitalizeFirstLetter(pokemonData.name) }}</span>
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
  height: calc($width * 1.2);
  border-radius: 5px;
  background-color: $color-card;
  color: $color-text;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &__header {
    flex: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    color: $color-text-secondary;
  }
  &__body {
    flex: 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-text;
  }
  &__image {
    width: 50%;
    border-radius: 10px;
    border: 1px solid $color-border;
  }
  &--captured {
    background-color: $color-selected-card;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
