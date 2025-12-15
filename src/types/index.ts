import referenceData from '../../public/reference-data.json'

// Theme types
export type Theme = 'dark' | 'light' | 'classic-red'

// Sort Options
export type SortBy = 'number-asc' | 'number-desc' | 'name-asc' | 'name-desc'
export type SortByOption = {
  value: SortBy
  label: string
}

// Pokemon Data Types
export type Region = (typeof referenceData.regions)[number] | 'all'

export type PokemonType = (typeof referenceData.types)[number]

export type ReferenceData = { // 引用資料
  regions: Region[],
  types: PokemonType[]
}

export type StructuredPokemonData = { // 整理過的資料結構
  id: number,
  name: string,
  types: PokemonType[],
  generationIntroduced: string,
  variants: {
    name: string,
    id: number
  }[],
  dexMap: Record<string, number>
}

export type CaughtPokemonData = {
  isShiny: boolean,
  timestamp: number,
}

// Bottom Drawer Types
export type DrawerComponentName = 'settings' | 'advanced-filters' | null
