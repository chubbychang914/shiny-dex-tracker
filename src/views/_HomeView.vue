<template>
  <div class="home-container">
    <div class="progress-tracker">
      <div
        v-for="dex in ALL_POKEDEX_GROUPS"
        class="title-container"
        :key="dex.pokedexName"
      >
        <TrackProgressCard :dex-data="dex" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrackProgressCard from '@/components/molecules/cards/TrackProgressCard.vue'
import { ALL_POKEDEX_GROUPS } from '@/constants/referenceData'

// ******************************
// STATE
// ******************************

// ******************************
// Methods
// ******************************
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
}

.title-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
