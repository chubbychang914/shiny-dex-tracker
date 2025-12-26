import fs from 'fs' // 'fs' (file system) to write files to harddrive
import path from 'path' // 'path' to know where folders are
import { fileURLToPath } from 'url' // 'fileURLToPath' to know where the script is running
import { capitalizeFirstLetter } from '../src/utils/helpers.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOTAL_POKEMON = 1025
const BATCH_SIZE = 30
const DELAY_MS = 1000

// Wait for the next batch
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Write to file
const writeToFile = (data, fileName) => {
  const publicDir = path.resolve(__dirname, '../public')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir)
  }

  const outputPath = path.join(publicDir, fileName)
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  return outputPath
}

// Fetch all regions data
const fetchAllRegions = async () => {
  try {
    const regionsUrl = 'https://pokeapi.co/api/v2/region'
    const regionsRes = await fetch(regionsUrl).then((res) => res.json())
    return regionsRes.results.map((region) => region.name)
  } catch (error) {
    console.error('Error fetching all regions:', error)
  }
}

// Fetch all types data
const fetchAllTypes = async () => {
  try {
    const typesUrl = 'https://pokeapi.co/api/v2/type'
    const typesRes = await fetch(typesUrl).then((res) => res.json())
    return typesRes.results.map((type) => type.name)
  } catch (error) {
    console.error('Error fetching all types:', error)
  }
}

// Sort by game dex
const GAME_POKEDEX_MAPPING = [
  {
    id: 'lets-go',
    group: 'lets-go',
    displayName: "Let's Go Pikachu/Eevee",
    pokedexName: 'letsgo-kanto'
  },
  {
    id: 'bdsp',
    group: 'bdsp',
    displayName: 'Brilliant Diamond/Shining Pearl',
    pokedexName: 'extended-sinnoh'
  },
  {
    id: 'swsh',
    group: 'swsh',
    displayName: 'Sword/Shield',
    pokedexName: 'galar'
  },
  {
    id: 'swsh-dlc1',
    group: 'swsh',
    displayName: 'Sword/Shield: Isle of Armor',
    pokedexName: 'isle-of-armor'
  },
  {
    id: 'swsh-dlc2',
    group: 'swsh',
    displayName: 'Sword/Shield: Crown Tundra',
    pokedexName: 'crown-tundra'
  },
  {
    id: 'legends-arceus',
    group: 'legends-arceus',
    displayName: 'Legends: Arceus',
    pokedexName: 'hisui'
  },
  {
    id: 'sv',
    group: 'sv',
    displayName: 'Scarlet/Violet',
    pokedexName: 'paldea'
  },
  {
    id: 'sv-dlc1',
    group: 'sv',
    displayName: 'Scarlet/Violet: The Teal Mask',
    pokedexName: 'kitakami'
  },
  {
    id: 'sv-dlc2',
    group: 'sv',
    displayName: 'Scarlet/Violet: The Indigo Disk',
    pokedexName: 'blueberry'
  },
  {
    id: 'za',
    group: 'za',
    displayName: 'Legends ZA',
    pokedexName: 'lumiose-city'
  },
  {
    id: 'za-dlc1',
    group: 'za',
    displayName: 'Legends ZA: Mega Dimensions',
    pokedexName: 'hyperspace'
  }
]

// Fetch individual Pokemon details
const fetchPokemonDetails = async (id) => {
  try {
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${id}` // 取得 type, region
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}` // 取得不同遊戲的 dex 資料, origin generation

    const [detailRes, speciesRes] = await Promise.all([
      fetch(detailUrl).then((res) => res.json()),
      fetch(speciesUrl).then((res) => res.json())
    ])

    // 取得不同遊戲的 dex number
    const dexMap = {
      national: id
    }
    speciesRes.pokedex_numbers.forEach((item) => {
      dexMap[item.pokedex.name] = item.entry_number
    })

    // 對應的 generation
    const generationMap = {
      'generation-i': 'kanto',
      'generation-ii': 'johto',
      'generation-iii': 'hoenn',
      'generation-iv': 'sinnoh',
      'generation-v': 'unova',
      'generation-vi': 'kalos',
      'generation-vii': 'alola',
      'generation-viii': 'galar',
      'generation-ix': 'paldea'
    }
    let generationIntroduced = generationMap[speciesRes.generation.name] || 'unknown'
    if (generationIntroduced === 'galar' && dexMap.hisui) generationIntroduced = 'hisui' // ex: sneasler and basculegion

    const variants = speciesRes.varieties.map((variant) => {
      return {
        name: variant.pokemon.name,
        id: parseInt(variant.pokemon.url.split('/').filter(Boolean).pop())
      }
    })

    return {
      id: detailRes.id,
      name: detailRes.name,
      types: detailRes.types.map((type) => type.type.name),
      generationIntroduced,
      variants,
      dexMap,
      isRegionVariant: false
    }
  } catch (error) {
    console.error(`Error fetching Pokemon details for ID ${id}:`, error)
  }
}

// Fetch variants data (alolan, galarian, hisuian) -> variants don't have pokemon-species api, so use some of base form data
const fetchRegionVariants = async (regionName, variantFoundList) => {
  try {
    const regionNameMap = {
      alola: 'a',
      galar: 'g',
      hisui: 'h'
    }

    const promises = variantFoundList.map(async (variant) => {
      const detailUrl = `https://pokeapi.co/api/v2/pokemon/${variant.id}`
      const detailRes = await fetch(detailUrl).then((res) => res.json())

      return {
        id: variant.id,
        name: `${regionNameMap[regionName]}-${variant.baseFormData.name}`,
        types: detailRes.types.map((type) => type.type.name),
        generationIntroduced: regionName,
        variants: variant.baseFormData.variants,
        dexMap: variant.baseFormData.dexMap,
        isRegionVariant: true
      }
    })

    const result = await Promise.all(promises)
    return result
  } catch (error) {
    console.error(error)
  }
}

const initializeDexData = async (startId = 1, endId = TOTAL_POKEMON) => {
  console.log(`🔍 Generating Pokemon data from PokeAPI from ID ${startId} to ${endId}...`)
  let allPokemon = []
  let alolanVariantFound = []
  let galarianVariantFound = []
  let hisuianVariantFound = []

  // Step 1: Fetch all base pokemon
  for (let i = startId; i <= endId; i += BATCH_SIZE) {
    const end = Math.min(i + BATCH_SIZE - 1, endId)
    console.log(`✨ Fetching IDs ${i} to ${end}...`)

    const promises = []
    for (let id = i; id <= end; id++) {
      promises.push(fetchPokemonDetails(id))
    }

    const batchResults = await Promise.all(promises)
    const validResults = batchResults.filter((p) => p !== null)
    allPokemon = [...allPokemon, ...validResults]

    if (end < TOTAL_POKEMON) {
      await sleep(DELAY_MS)
    }
  }

  // Step 2: Find variants
  allPokemon.forEach((pokemon) => {
    pokemon.variants.forEach((variant) => {
      if (variant.name.includes('alola')) {
        // TODO:
        // remove edge cases such as alola-totem raticate
        // galarian darmanitan has standard and zen
        // pikachu has standard and alola but cap only
        alolanVariantFound.push({ id: variant.id, baseFormData: pokemon })
      }
      if (variant.name.includes('galar')) {
        galarianVariantFound.push({ id: variant.id, baseFormData: pokemon })
      }
      if (variant.name.includes('hisui')) {
        hisuianVariantFound.push({ id: variant.id, baseFormData: pokemon })
      }
    })
  })

  // Step 3: Get Variant Data
  console.log('✨ Fetching Alolan Variants Data...')
  const alolanVariants = await fetchRegionVariants('alola', alolanVariantFound)
  console.log('✨ Fetching Galarian Variants Data...')
  const galarianVariants = await fetchRegionVariants('galar', galarianVariantFound)
  console.log('✨ Fetching Hisuian Variants Data...')
  const hisuianVariants = await fetchRegionVariants('hisui', hisuianVariantFound)

  // Step 4: Combine and default sort bt dex number
  allPokemon = [...allPokemon, ...alolanVariants, ...galarianVariants, ...hisuianVariants]
  allPokemon.sort((a, b) => a.id - b.id)

  writeToFile(allPokemon, 'raw-pokemon-data.json')
  console.log('✏️ Pokemon data saved to public/raw-pokemon-data.json')
}

const initializeReferenceData = async () => {
  console.log('🔍 Generating reference data...')
  console.log('✨ Fetching regions...')
  const regions = await fetchAllRegions()
  console.log('✨ Fetching types...')
  const types = await fetchAllTypes()

  writeToFile({ regions, types, gameDexMap: GAME_POKEDEX_MAPPING }, 'reference-data.json')
  console.log('✏️ Reference data saved to public/reference-data.json')
}

await initializeReferenceData()
await initializeDexData()
