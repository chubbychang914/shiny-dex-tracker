// ==============================
// THEME TYPES
// ==============================
export type Theme = 'pokeball' | 'greatball' | 'masterball'

// ==============================
// FILTER TYPES
// ==============================
export type DexFiltersType = {
  sortBy: string
  regions: string[]
  types: string[]
}

// ==============================
// POKEMON DATA TYPES FROM POKEAPI
// ==============================
export type StructuredPokemonData = {
  id: number
  name: string
  types: string[]
  generationIntroduced: string
  generation: string
  isLegendary: boolean
  isMythical: boolean
  variants: {
    name: string
    id: number
  }[]
  dexMap: Record<string, number>
  isRegionVariant: boolean
}

export type CaughtPokemonData = {
  isShiny: boolean
  timestamp: number
}

// ==============================
// BOTTOM DRAWER TYPES
// ==============================
export type DrawerComponentName = 'advanced-filters' | null
