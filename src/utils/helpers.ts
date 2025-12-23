import type { StructuredPokemonData } from '@/types/index.ts'

/** capitalize first letter */
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/** format pokemon name */
export const formatPokemonDisplayName = (singlePokemonData: StructuredPokemonData) => {
  if (!singlePokemonData.name.includes('-')) {
    return capitalizeFirstLetter(singlePokemonData.name)
  }
  // if contains hyphen, remove hyphen and capitalize each word (example: iron-valiant -> Iron Valiant)
  const formattedName = singlePokemonData.name.split('-').map(capitalizeFirstLetter).join(' ')

  // if contains variants, remove the last word (example: Deoxys Normal -> Deoxys)
  if (singlePokemonData.variants.length > 1) {
    const lastSpaceIndex = formattedName.lastIndexOf(' ')
    return lastSpaceIndex !== -1 ? formattedName.slice(0, lastSpaceIndex) : formattedName
  }

  return formattedName
}
