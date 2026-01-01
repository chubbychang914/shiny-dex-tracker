import referenceData from '../../public/reference-data.json'

// ==============================
// THEME TYPES
// ==============================
export type Theme = 'pokeball' | 'greatball' | 'masterball'

// ==============================
// FILTER TYPES
// ==============================
export type SortFilter = string

export type SortByOption = {
  value: SortFilter
  label: string
}

export type RegionFilter = string[]

export type TypeFilter = string[]

// ==============================
// POKEMON DATA TYPES FROM POKEAPI
// ==============================
export type Region = (typeof referenceData.regions)[number] | 'all'

export type PokemonType = (typeof referenceData.types)[number]

export type GameDexMap = {
  id: string
  group: string
  displayName: string
  pokedexName: string
}

export type ReferenceData = {
  regions: Region[]
  types: PokemonType[]
  gameDexMap: GameDexMap[]
}

export type StructuredPokemonData = {
  id: number
  name: string
  types: PokemonType[]
  generationIntroduced: string
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
export type DrawerComponentName = 'settings' | 'advanced-filters' | null
