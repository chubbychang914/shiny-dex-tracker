<template>
  <div
    class="track-progress-card"
    @click="navigateToDex(props.dexData.pokedexName)"
  >
    <p>{{ props.dexData.displayName }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { AllPokedexGroupsItem } from '@/types/index.ts'

const router = useRouter()

const props = defineProps<{
  dexData: AllPokedexGroupsItem
}>()

const navigateToDex = (dexName: string) => {
  console.log('dexName', dexName)
  if (dexName === 'national') {
    router.push('/national-dex')
  } else {
    router.push(`/game-dex/${dexName}`)
  }
}
</script>
