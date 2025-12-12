import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReferenceData, StructuredPokemonData } from '@/types/index.ts'

export const usePokeApiDataStore = defineStore('pokeApiData', () => {
  // State
  const pokeApiData = ref<StructuredPokemonData[]>([])
  const referenceData = ref<ReferenceData>({ regions: [], types: []})

  // Actions
  const initData = async () => { // 將資料存到 store 供全域使用
    const [fullPokedexData, referenceData] = await Promise.all([
      fetch('/raw-pokemon-data.json').then(res => res.json()),
      fetch('/reference-data.json').then(res => res.json())
    ])

    pokeApiData.value = fullPokedexData
    referenceData.value = referenceData
  }

  return {
    pokeApiData,
    referenceData,
    initData,
  }
})
