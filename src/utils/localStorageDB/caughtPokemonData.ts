import type { CaughtPokemonData } from '@/types/index.ts'

const STORAGE_KEY = 'caught-pokemon-data'

export const loadFromStorage = (): Record<number, CaughtPokemonData> => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {}
}

export const saveToStorage = (data: Record<number, CaughtPokemonData>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const toggleCaughtStatus = (dexNumber: number): boolean => {
  const stored = loadFromStorage()
  const pokemonCaughtState = !!stored[dexNumber]

  if (pokemonCaughtState) {
    delete stored[dexNumber]
    saveToStorage(stored)
    return false
  } else {
    stored[dexNumber] = {
      isShiny: true,
      timestamp: Date.now()
    }
    saveToStorage(stored)
    return true
  }
}

