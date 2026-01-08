import type { DexFiltersType } from '@/types'

const STORAGE_KEY = 'pokedex/dex-filters'

/** Load dex filters from storage */
export const loadDexFiltersFromStorage = (): Record<string, DexFiltersType> => {
  const savedData = localStorage.getItem(STORAGE_KEY)
  return savedData ? JSON.parse(savedData) : {}
}

/** Get single dex filter from storage */
export const getSingleDexFilter = (dexName: string) => {
  const allFilters = loadDexFiltersFromStorage()
  return allFilters[dexName]
}

/** Clear single dex filter from storage */
export const clearSingleDexFilter = (dexName: string) => {
  const allFilters = loadDexFiltersFromStorage()
  delete allFilters[dexName]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allFilters))
}

/** Save dex filter to storage */
export const saveDexFiltersToStorage = (dexName: string, filters: DexFiltersType) => {
  const allFilters = loadDexFiltersFromStorage()
  allFilters[dexName] = filters
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allFilters))
}
