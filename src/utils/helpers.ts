import type { StructuredPokemonData } from '@/types/index.ts'

/** capitalize first letter */
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const splitHyphenAndCapitalizeName = (name: string) => {
  return name.split('-').map(capitalizeFirstLetter).join(' ')
}

/** format pokemon name */
export const formatPokemonDisplayName = (singlePokemonData: StructuredPokemonData) => {
  if (!singlePokemonData.name.includes('-')) {
    return capitalizeFirstLetter(singlePokemonData.name)
  }
  if (singlePokemonData.isRegionVariant) {
    return splitHyphenAndCapitalizeName(singlePokemonData.name)
  }
  if (singlePokemonData.name === 'ho-oh') {
    return 'Ho-oh'
  }

  // if contains hyphen, remove hyphen and capitalize each word (example: iron-valiant -> Iron Valiant)
  const formattedName = singlePokemonData.name
    .split('-')
    .filter((part) => part.length > 0)
    .map(capitalizeFirstLetter)
    .join(' ')

  // if contains variants, remove the last word (example: Deoxys Normal -> Deoxys)
  if (singlePokemonData.variants.length > 1) {
    const firstSpaceIndex = formattedName.indexOf(' ')
    return firstSpaceIndex !== -1 ? formattedName.slice(0, firstSpaceIndex) : formattedName
  }

  return formattedName
}
