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

// 寫入檔案
const writeToFile = (data, fileName) => {
  const publicDir = path.resolve(__dirname, '../public')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir)
  }

  const outputPath = path.join(publicDir, fileName)
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  return outputPath
}

// 抓取所有 Region 資料
const fetchAllRegions = async () => {
  try {
    const regionsUrl = 'https://pokeapi.co/api/v2/region'
    const regionsRes = await fetch(regionsUrl).then(res => res.json())
    return regionsRes.results.map(region => region.name)
  } catch (error) {
    console.error('Error fetching all regions:', error)
  }
}

// 抓取所有 Type 資料
const fetchAllTypes = async () => {
  try {
    const typesUrl = 'https://pokeapi.co/api/v2/type'
    const typesRes = await fetch(typesUrl).then(res => res.json())
    return typesRes.results.map(type => type.name)
  } catch (error) {
    console.error('Error fetching all types:', error)
  }
}

// 抓取個別 Pokemon 的詳細資料
const fetchPokemonDetails = async (id) => {
try {
  const detailUrl = `https://pokeapi.co/api/v2/pokemon/${id}` // 取得 type, region
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}` // 取得不同遊戲的 dex 資料, origin generation

  const [detailRes, speciesRes] = await Promise.all([
    fetch(detailUrl).then(res => res.json()),
    fetch(speciesUrl).then(res => res.json())
  ])

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
  const generationIntroduced = generationMap[speciesRes.generation.name] || 'unknown'

  // 取得不同遊戲的 dex number
  const dexMap = {
    national: id
  }
  speciesRes.pokedex_numbers.forEach(item => {
    dexMap[item.pokedex.name] = item.entry_number
  })

  const variants = speciesRes.varieties.map(variant => {
    return {
      name: variant.pokemon.name,
      id: parseInt(variant.pokemon.url.split('/').filter(Boolean).pop())
    }
  })

  return {
    id: detailRes.id,
    name: detailRes.name,
    types: detailRes.types.map(type => type.type.name),
    generationIntroduced,
    variants,
    dexMap
  }
} catch (error) {
  console.error(`Error fetching Pokemon details for ID ${id}:`, error)
}
}

const initializeDexData = async (startId = 1, endId = TOTAL_POKEMON) => {
  console.log(`🔍 Generating Pokemon data from PokeAPI from ID ${startId} to ${endId}...`)
  let allPokemon = []

  for (let i = startId; i <= endId; i += BATCH_SIZE) {
    const end = Math.min(i + BATCH_SIZE - 1, endId)
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

  writeToFile(allPokemon, 'raw-pokemon-data.json')
  console.log('✏️ Pokemon data saved to public/raw-pokemon-data.json')
}

const initializeReferenceData = async () => {
  console.log('🔍 Generating reference data...')
  console.log('✨ Fetching regions...')
  const regions =  await fetchAllRegions()
  console.log('✨ Fetching types...')
  const types = await fetchAllTypes()

  writeToFile({ regions, types }, 'reference-data.json')
  console.log('✏️ Reference data saved to public/reference-data.json')
}

await initializeReferenceData()
await initializeDexData()
