<script setup lang="ts">
import { computed, ref } from 'vue'
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
const isCaught = ref(false)

const pokemonCardImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.singlePokemonData.id}.png`
})

const handleToggleCaughtStatus = () => {
  isCaught.value = !isCaught.value
}
</script>

<template>
  <div class="mini-pokemon-card">
    <div
      class="image-container"
      @click="handleToggleCaughtStatus"
    >
      <img
        :src="pokemonCardImage"
        :class="{ 'silhouette-effect': !isCaught }"
        alt="mini-pokemon-card-image"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: calc((100vw - 70px) / 6); // gap size * 5 + container padding * 2 = 70px
$height: calc($width * 1);

.mini-pokemon-card {
  width: $width;
  height: $height;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid yellow;
}
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

// .silhouette-effect {
//   filter: brightness(0) contrast(1.5); // silhouette effect
// }

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
