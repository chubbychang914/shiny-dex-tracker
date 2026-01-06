// ******************************************************************************************
// Fetch Regions => 'https://pokeapi.co/api/v2/region'
// ******************************************************************************************
export const REGIONS = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'hisui', 'paldea']

// ******************************************************************************************
// Fetch Types => 'https://pokeapi.co/api/v2/type'
// ******************************************************************************************
export const TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
]

// ******************************************************************************************
// Get all available pokedex => 'https://pokeapi.co/api/v2/pokedex?limit=100'
// ******************************************************************************************
export const ALL_POKEDEX_GROUPS = [
  {
    pokedexName: 'national',
    displayName: 'National',
    group: 'national',
    pokemonEntries: 1025,
    url: 'https://pokeapi.co/api/v2/pokedex/1/'
  },
  {
    pokedexName: 'letsgo-kanto',
    displayName: 'Kanto',
    group: 'lgpe',
    pokemonEntries: 153, // HOME 150
    url: 'https://pokeapi.co/api/v2/pokedex/26/'
  },
  {
    pokedexName: 'original-sinnoh',
    displayName: 'Sinnoh',
    group: 'bdsp',
    pokemonEntries: 151, // HOME 150
    url: 'https://pokeapi.co/api/v2/pokedex/5/'
  },
  {
    pokedexName: 'galar',
    displayName: 'Galar',
    group: 'swsh',
    pokemonEntries: 400,
    url: 'https://pokeapi.co/api/v2/pokedex/27/'
  },
  {
    pokedexName: 'isle-of-armor',
    displayName: 'Isle of Armor',
    group: 'swsh',
    pokemonEntries: 211, // HOME 210
    url: 'https://pokeapi.co/api/v2/pokedex/28/'
  },
  {
    pokedexName: 'crown-tundra',
    displayName: 'Crown Tundra',
    group: 'swsh',
    pokemonEntries: 210,
    url: 'https://pokeapi.co/api/v2/pokedex/29/'
  },
  {
    pokedexName: 'hisui',
    displayName: 'Hisui',
    group: 'pla',
    pokemonEntries: 242,
    url: 'https://pokeapi.co/api/v2/pokedex/30/'
  },
  {
    pokedexName: 'paldea',
    displayName: 'Paldea',
    group: 'sv',
    pokemonEntries: 400,
    url: 'https://pokeapi.co/api/v2/pokedex/31/'
  },
  {
    pokedexName: 'kitakami',
    displayName: 'Kitakami',
    group: 'sv',
    pokemonEntries: 200,
    url: 'https://pokeapi.co/api/v2/pokedex/32/'
  },
  {
    pokedexName: 'blueberry',
    displayName: 'Blueberry',
    group: 'sv',
    pokemonEntries: 243, // HOME 240
    url: 'https://pokeapi.co/api/v2/pokedex/33/'
  },
  {
    pokedexName: 'lumiose-city',
    displayName: 'Lumiose City',
    group: 'plza',
    pokemonEntries: 232,
    url: 'https://pokeapi.co/api/v2/pokedex/34/'
  },
  {
    pokedexName: 'hyperspace',
    displayName: 'Hyperspace',
    group: 'plza',
    pokemonEntries: 132,
    url: 'https://pokeapi.co/api/v2/pokedex/35/'
  }
]

export const REFERENCE_DATA = {
  regions: REGIONS,
  types: TYPES,
  gameDexMap: ALL_POKEDEX_GROUPS
}
