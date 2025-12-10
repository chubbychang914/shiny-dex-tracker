// Theme types
export type Theme = 'dark' | 'light' | 'classic-red'

// Search Query Types
export type PokemonType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'
export type Region = 'all' | 'kanto' | 'johto' | 'hoenn' | 'sinnoh' | 'unova' | 'kalos' | 'alola' | 'galar' | 'hisui' | 'paldea'
export type RegionOption = {
  value: Region
  label: string
}

// Sort Options
export type SortBy = 'number-asc' | 'number-desc' | 'name-asc' | 'name-desc'
export type SortByOption = {
  value: SortBy
  label: string
}

// Pokemon Data Types
export type RegionRange = {
  start: number
  end: number
}
export type StructuredPokemonData = {
  dexNumber: number
  name: string,
  sprites: object,
  types: string[]
  region: string
}

// Bottom Drawer Types
export type DrawerComponentName = 'settings' | 'advanced-filters' | null
