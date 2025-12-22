// DEPRECATED: run script converted to JSON and stored in public folder instead

// import { initDB, POKEAPI_CACHE_STORE } from '@/utils/indexedDB.ts'
// import type { StructuredPokemonData } from '@/types/index.ts'

// type CachedPokemonData = StructuredPokemonData & { timestamp: number }

// export const checkPokemonDataCache = async (): Promise<boolean> => {
//   const database = await initDB()
//   const transaction = database.transaction(POKEAPI_CACHE_STORE, 'readonly')
//   const store = transaction.objectStore(POKEAPI_CACHE_STORE)
//   const count = await store.count()
//   return count > 0
// }

// export const savePokemonDataToCache = async (pokemonList: StructuredPokemonData[]): Promise<void> => {
//   const database = await initDB()
//   const transaction = database.transaction(POKEAPI_CACHE_STORE, 'readwrite')
//   const store = transaction.objectStore(POKEAPI_CACHE_STORE)

//   await store.clear() // 清空 store

//   const addDataPromises = pokemonList.map(pokemon => {
//     const cacheData: CachedPokemonData = {
//       ...pokemon,
//       timestamp: Date.now()
//     }

//     return store.put(cacheData)
//   })

//   await Promise.all(addDataPromises)
//   await transaction.done
// }

// export const getAllPokemonDataFromCache = async (): Promise<StructuredPokemonData[]> => {
//   const database = await initDB()
//   const transaction = database.transaction(POKEAPI_CACHE_STORE, 'readonly')
//   const store = transaction.objectStore(POKEAPI_CACHE_STORE)

//   const cachedData = await store.getAll()
//   return cachedData
// }

// export const clearPokemonDataCache = async (): Promise<void> => {
//   const database = await initDB()
//   const transaction = database.transaction(POKEAPI_CACHE_STORE, 'readwrite')
//   const store = transaction.objectStore(POKEAPI_CACHE_STORE)

//   await store.clear()
//   await transaction.done
// }
