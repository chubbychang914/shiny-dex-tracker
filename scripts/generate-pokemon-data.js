// Fetch Regions => 'https://pokeapi.co/api/v2/region'
// Fetch Types => 'https://pokeapi.co/api/v2/type'
// Fetch Pokemon Details => 'https://pokeapi.co/api/v2/pokemon/{id}'
// Fetch Pokemon Species => 'https://pokeapi.co/api/v2/pokemon-species/{id}'

// GENERATION_MAP: {
//   'generation-i': 'kanto',
//   'generation-ii': 'johto',
//   'generation-iii': 'hoenn',
//   'generation-iv': 'sinnoh',
//   'generation-v': 'unova',
//   'generation-vi': 'kalos',
//   'generation-vii': 'alola',
//   'generation-viii': 'galar',
//   'generation-ix': 'paldea'
// }

import fs from 'fs' // 'fs' (file system) to write files to harddrive
import path from 'path' // 'path' to know where folders are
import { fileURLToPath } from 'url' // 'fileURLToPath' to know where the script is running

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOTAL_POKEMON = 1025
const BATCH_SIZE = 30
const DELAY_MS = 1000

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const writeToFile = (data, fileName) => {
  const publicDir = path.resolve(__dirname, '../public')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir)
  }

  const outputPath = path.join(publicDir, fileName)
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  return outputPath
}

const getGenerationByID = (id) => {
  if (id >= 1 && id <= 151) return 'kanto'
  if (id >= 152 && id <= 251) return 'johto'
  if (id >= 252 && id <= 386) return 'hoenn'
  if (id >= 387 && id <= 493) return 'sinnoh'
  if (id >= 494 && id <= 649) return 'unova'
  if (id >= 650 && id <= 721) return 'kalos'
  if (id >= 722 && id <= 809) return 'alola'
  if (id >= 810 && id <= 898) return 'galar'
  if (id >= 899 && id <= 905) return 'hisui'
  if (id >= 906 && id <= 1025) return 'paldea'
  return 'unknown'
}

// Fetch individual Pokemon details
const fetchPokemonDetails = async (id) => {
  try {
    // only filtering switch games
    const GAME_DEX_MAP = [
      'letsgo-kanto',
      'original-sinnoh',
      'galar',
      'isle-of-armor',
      'crown-tundra',
      'hisui',
      'paldea',
      'kitakami',
      'blueberry',
      'lumiose-city',
      'hyperspace'
    ]

    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${id}` // 取得 type, region
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}` // 取得不同遊戲的 dex 資料, origin generation

    const [detailRes, speciesRes] = await Promise.all([
      fetch(detailUrl).then((res) => res.json()),
      fetch(speciesUrl).then((res) => res.json())
    ])

    const generationIntroduced = getGenerationByID(id)
    const generation = speciesRes.generation.name
    const isLegendary = speciesRes.is_legendary
    const isMythical = speciesRes.is_mythical

    // get dex number from each game
    const dexMap = {
      national: id
    }
    speciesRes.pokedex_numbers.forEach((item) => {
      if (GAME_DEX_MAP.includes(item.pokedex.name)) {
        dexMap[item.pokedex.name] = item.entry_number
      }
    })

    // get variants
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
      generation,
      isLegendary,
      isMythical,
      variants,
      dexMap,
      isRegionVariant: false
    }
  } catch (error) {
    console.error(`Error fetching Pokemon details for ID ${id}:`, error)
  }
}

const initializeDexData = async (startId = 1, endId = TOTAL_POKEMON) => {
  console.log(`🔍 Generating Pokemon data from PokeAPI from ID ${startId} to ${endId}...`)
  let allPokemon = []

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

  allPokemon.sort((a, b) => a.id - b.id)

  writeToFile(allPokemon, 'raw-pokemon-data.json')
  console.log('✏️ Pokemon data saved to public/raw-pokemon-data.json')
}

await initializeDexData()
