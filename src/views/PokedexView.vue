<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { pokeApi } from '@/utils/axios.ts'
import type { Region, RegionRange, StructuredPokemonData } from '@/types/index.ts'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import PokemonCard from '@/components/PokemonCard.vue'
import _cloneDeep from 'lodash/cloneDeep'
import {
  checkPokemonDataCache,
  savePokemonDataToCache,
  getAllPokemonDataFromCache,
  clearPokemonDataCache,
} from '@/utils/indexedDBStores/pokeApiCache.ts'

const filterQueriesStore = useFilterQueriesStore()

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

const filteredPokedexData = computed(() => {
  let result = _cloneDeep(pokedexData.value)

  if (filterQueriesStore.selectedRegion) { // 區域選擇
    console.log('✨selectedRegion', filterQueriesStore.selectedRegion)
    if (filterQueriesStore.selectedRegion !== 'all') {
      result = result.filter(pokemon => pokemon.region === filterQueriesStore.selectedRegion)
    }
  }

  if (filterQueriesStore.searchQuery) { // 搜尋
    console.log('✨searchQuery', filterQueriesStore.searchQuery)
    result = result.filter(pokemon => {
      const matchesName = pokemon.name.includes(filterQueriesStore.searchQuery)
      const matchesDexNumber = pokemon.dexNumber.toString().includes(filterQueriesStore.searchQuery)
      return matchesName || matchesDexNumber
    })
  }

  return result
})

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
  const hasPokemonDataInCache = await checkPokemonDataCache()
  if (hasPokemonDataInCache) {
    console.log('✨hasPokemonDataInCache')
    const cachedPokemonData = await getAllPokemonDataFromCache()
    pokedexData.value = cachedPokemonData
  } else {
    console.log('✨noPokemonDataInCache, fetch from API')
    await organizePokemonData() // 組織資料
  }
}

const apiGetPokemonDetails = async() => {
  const limit = 10
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

  pokedexData.value = structuredData

  console.log('💾 Saving Pokemon data to cache...')
  await savePokemonDataToCache(structuredData)
  console.log(`✅ Saved ${structuredData.length} Pokemon to cache`)
}

const getRegionByDexNumber = (dexNumber: number) => {
  for (const region in regionMap) {
    const range = regionMap[region]
    if (range && (dexNumber >= range.start && dexNumber <= range.end)) {
      return region as Region
    }
  }
  return 'all'
}
</script>

<template>
  <div class="pokedex">
    <div class="pokemon-cards-container">
      <PokemonCard
        v-for="(pokemon) in filteredPokedexData"
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
