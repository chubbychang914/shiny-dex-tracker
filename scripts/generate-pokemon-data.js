import fs from 'fs' // 'fs' (file system) to write files to harddrive
import path from 'path' // 'path' to know where folders are
import { fileURLToPath } from 'url' // 'fileURLToPath' to know where the script is running

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOTAL_POKEMON = 1025
const BATCH_SIZE = 30
const DELAY_MS = 1000

// 等待時間再抓下一筆資料
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 抓取個別 Pokemon 的詳細資料
const fetchPokemonDetails = async (id) => {
  try {
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${id}` // 取得 type, region
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}` // 取得不同遊戲的 dex 資料, origin generation

    const [detailRes, speciesRes] = await Promise.all([
      fetch(detailUrl).then(res => res.json()),
      fetch(speciesUrl).then(res => res.json())
    ])

    // 取得不同遊戲的 dex number
    const dexMap = {
      national: id
    }
    speciesRes.pokedex_numbers.forEach(item => {
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

    return {
      id: detailRes.id,
      name: detailRes.name,
      types: detailRes.types.map(type => type.type.name),
      generationIntroduced: generationMap[speciesRes.generation.name],
      dexMap: dexMap
    }
  } catch (error) {
    console.error(`Error fetching Pokemon details for ID ${id}:`, error)
  }
}

const writeToFile = (data) => {
  const publicDir = path.resolve(__dirname, '../public')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir)
  }

  const outputPath = path.join(publicDir, 'raw-pokemon-data.json')
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  return outputPath
}

const initializeDexData = async () => {
  console.log('🔍 Generating Pokemon data from PokeAPI...')
  let allPokemon = []

  for (let i = 1; i <= TOTAL_POKEMON; i += BATCH_SIZE) {
    const end = Math.min(i + BATCH_SIZE - 1, TOTAL_POKEMON)

    console.log(`✨ Fetching IDs ${i} to ${end}...`)

    const promises = []
    for (let id = i; id <= end; id++) {
      promises.push(fetchPokemonDetails(id))
    }

    const batchResults = await Promise.all(promises)

    const validResults = batchResults.filter(p => p !== null)
    allPokemon = [...allPokemon, ...validResults]

    if (end < TOTAL_POKEMON) {
      await sleep(DELAY_MS)
    }
  }
  allPokemon.sort((a, b) => a.id - b.id)
  writeToFile(allPokemon)
  console.log('✅ Pokemon data saved to public/raw-pokemon-data.json')
}

initializeDexData()
