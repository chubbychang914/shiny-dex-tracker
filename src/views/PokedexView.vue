<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
</script>

<template>
  <div class="pokedex">
    <div class="pokemon-cards-container">
      <PokemonCard v-for="i in 100" :key="i" />
    </div>
  </div>
  <el-drawer>
  </el-drawer>
</template>

<style lang="scss" scoped>
.pokedex {
  width: 100%;
  height: 100%;
}
.pokemon-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}
</style>
