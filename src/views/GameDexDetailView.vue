<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="game-dex-detail-container">
    <div class="game-dex-detail-content">
      {{ route.params.pokedexName }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
