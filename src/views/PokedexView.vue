<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
</script>

<template>
  <div class="pokedex-container">
    <PokemonCard />
    <PokemonCard />
    <PokemonCard />
    <PokemonCard />
  </div>
</template>

<style lang="scss" scoped>
.pokedex-container {
  width: 100%;
  height: 100%;
  background-color: blue;
  padding: 15px;
  overflow: auto;
}
</style>