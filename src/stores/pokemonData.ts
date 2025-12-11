import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReferenceData, StructuredPokemonData } from '@/types/index.ts'

export const usePokemonDataStore = defineStore('pokemonData', () => {
  // State
  const pokemonData = ref<StructuredPokemonData[]>([])
  const referenceData = ref<ReferenceData>({
    regions: [],
    types: []
  })

  // Actions
  const setPokemonData = (data: StructuredPokemonData[]) => {
    pokemonData.value = data
  }

  const setReferenceData = (data: ReferenceData) => {
    referenceData.value = data
  }

  // 將資料存到 store 供全域使用
  const initData = async () => {
    const [pokemonData, referenceData] = await Promise.all([
      fetch('/raw-pokemon-data.json').then(res => res.json()),
      fetch('/reference-data.json').then(res => res.json())
    ])

    setPokemonData(pokemonData)
    setReferenceData(referenceData)
  }

  return {
    pokemonData,
    referenceData,
    initData,
  }
})
