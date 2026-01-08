import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StructuredPokemonData } from '@/types/index.ts'

export const usePokeApiDataStore = defineStore('pokeApiData', () => {
  // State
  const pokeApiData = ref<StructuredPokemonData[]>([])

  // Actions
  const initData = async () => {
    // 將資料存到 store 供全域使用
    const fullData = await fetch('/raw-pokemon-data.json').then((res) => res.json())
    pokeApiData.value = fullData
  }

  return {
    pokeApiData,
    initData
  }
})
