import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { StructuredPokemonData } from '@/types/index.ts'

/* Database: pokemon-dex-tracker-db
*   ├── Store 1: "pokeapi-cache" (API responses for caching)
*   ├── Store 2: "user-data" (user's captured Pokemon)
*   └── Store 3: "user-settings" (user preferences - future)
*/

// ==============================
// Database (Cabinet))
// ==============================
export const DB_NAME = 'pokedex-tracker-db'
export const DB_VERSION = 1

// ==============================
// Stores (Drawers in a cabinet)
// ==============================
export const POKEAPI_CACHE_STORE = 'pokeapi-cache' // API responses for caching
// const USER_DATA_STORE = 'user-data' // user's flags
// const USER_SETTINGS_STORE = 'user-settings' // user preferences - future

// ==============================
// INTERFACE - Define structure of all stores
// ==============================
export interface PokedexDBSchema extends DBSchema {
  // Drawer 1: PokeAPI Cache
  [POKEAPI_CACHE_STORE]: {
    key: number // dex number
    value: StructuredPokemonData & { timestamp: number }
  }
}

// ==============================
// GLOBAL VARIABLE - Database connection
// * 'IDBDatabase' is the native browser type (callback-based).
// * 'IDBPDatabase<MyDB>' is the Promise-based type from 'idb' library (the "P" stands for Promise).
// ==============================
let database: IDBPDatabase<PokedexDBSchema> | null = null

// ==============================
// Initialize Database
// ==============================
export const initDB = async () => {
  if (database) return database
  if (!window.indexedDB) throw new Error('IndexedDB is not supported in this browser')

  database = await openDB<PokedexDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const pokeApiCacheExists = db.objectStoreNames.contains(POKEAPI_CACHE_STORE)

      // Create drawer 1
      if (!pokeApiCacheExists) db.createObjectStore(POKEAPI_CACHE_STORE, { keyPath: 'dexNumber' })
    }
  })

  return database
}
