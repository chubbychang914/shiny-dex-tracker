<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pokeApi } from '@/utils/axios.ts'
import type { RegionRange, StructuredPokemonData } from '@/types/index.ts'
import PokemonCard from '@/components/PokemonCard.vue'

// ==============================
// Data
// ==============================
const regionMap: Record<string, RegionRange> = {
  kanto: { start: 1, end: 151 },
  johto: { start: 152, end: 251 },
  hoenn: { start: 252, end: 386 },
  sinnoh: { start: 387, end: 493 },
  unova: { start: 494, end: 649 },
  kalos: { start: 650, end: 721 },
  alola: { start: 722, end: 809 },
  galar: { start: 810, end: 905 },
  paldea: { start: 906, end: 1025 },
}
const pokedexData = ref<StructuredPokemonData[]>([])

// ==============================
// Lifecycle Hooks
// ==============================
onMounted(async () => {
  await initializeData()
})

// ==============================
// Methods
// ==============================
const initializeData = async () => {
  await apiGetPokemonDetails() // 取得詳細Pokemon資料
  await organizePokemonData() // 組織資料
}

const apiGetPokemonDetails = async() => {
  const limit = 151
  const getList = await pokeApi.get(`/pokemon?limit=${limit}`)
  const pokemonList = getList?.data?.results

  const getPokemonDetails = pokemonList.map(async (pokemon: { name: string, url: string }) => {
    const id = pokemon.url.split('/').filter(Boolean).pop()
    const individualPokemonData = await pokeApi.get(`/pokemon/${id}`)
    return individualPokemonData.data
  })

  return Promise.all(getPokemonDetails)
}

const organizePokemonData = async () => {
  const data = await apiGetPokemonDetails()
  const structuredData = data.map((pokemon) => {
    const region = getRegionByDexNumber(pokemon.id as number)
    return {
      dexNumber: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
      types: pokemon.types.map((type: { type: { name: string } }) => type.type.name),
      region: region
    }
  })

  console.log(structuredData)
  pokedexData.value = structuredData
}

const getRegionByDexNumber = (dexNumber: number) => {
  for (const region in regionMap) {
    const range = regionMap[region]
    if (range && (dexNumber >= range.start && dexNumber <= range.end)) {
      return region
    }
  }
  return 'all'
}
</script>

<template>
  <div class="pokedex">
    <div class="pokemon-cards-container">
      <PokemonCard
        v-for="(pokemon) in pokedexData"
        :key="pokemon.dexNumber"
        :pokemon-data="pokemon"
      />
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
