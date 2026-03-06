import lgPikachu from '@/assets/images/gameIcons/lgPikachu.png'
import lgEevee from '@/assets/images/gameIcons/lgEevee.png'
import bDiamond from '@/assets/images/gameIcons/bDiamond.png'
import sPearl from '@/assets/images/gameIcons/sPearl.png'
import sword from '@/assets/images/gameIcons/sword.png'
import shield from '@/assets/images/gameIcons/shield.png'
import plArceus from '@/assets/images/gameIcons/plArceus.png'
import scarlet from '@/assets/images/gameIcons/scarlet.png'
import violet from '@/assets/images/gameIcons/violet.png'
import plZA from '@/assets/images/gameIcons/plZA.png'

export const GAME_ICONS: Record<string, string> = {
  lgPikachu: lgPikachu,
  lgEevee: lgEevee,
  bDiamond: bDiamond,
  sPearl: sPearl,
  sword: sword,
  shield: shield,
  plArceus: plArceus,
  scarlet: scarlet,
  violet: violet,
  plZA: plZA
}

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
    order: 1,
    pokedexName: 'national',
    displayName: 'National',
    group: 'national',
    gameIconList: [],
    pokemonEntries: 1025,
    url: 'https://pokeapi.co/api/v2/pokedex/1/'
  },
  {
    order: 12,
    pokedexName: 'letsgo-kanto',
    displayName: 'Kanto',
    group: 'lgpe',
    gameIconList: ['lgPikachu', 'lgEevee'],
    pokemonEntries: 153, // HOME 150
    url: 'https://pokeapi.co/api/v2/pokedex/26/'
  },
  {
    order: 11,
    pokedexName: 'original-sinnoh',
    displayName: 'Sinnoh',
    group: 'bdsp',
    gameIconList: ['bDiamond', 'sPearl'],
    pokemonEntries: 151, // HOME 150
    url: 'https://pokeapi.co/api/v2/pokedex/5/'
  },
  {
    order: 8,
    pokedexName: 'galar',
    displayName: 'Galar',
    group: 'swsh',
    gameIconList: ['sword', 'shield'],
    pokemonEntries: 400,
    url: 'https://pokeapi.co/api/v2/pokedex/27/'
  },
  {
    order: 9,
    pokedexName: 'isle-of-armor',
    displayName: 'Isle of Armor',
    group: 'swsh',
    gameIconList: ['sword', 'shield'],
    pokemonEntries: 211, // HOME 210
    url: 'https://pokeapi.co/api/v2/pokedex/28/'
  },
  {
    order: 10,
    pokedexName: 'crown-tundra',
    displayName: 'Crown Tundra',
    group: 'swsh',
    gameIconList: ['sword', 'shield'],
    pokemonEntries: 210,
    url: 'https://pokeapi.co/api/v2/pokedex/29/'
  },
  {
    order: 7,
    pokedexName: 'hisui',
    displayName: 'Hisui',
    group: 'pla',
    gameIconList: ['plArceus'],
    pokemonEntries: 242,
    url: 'https://pokeapi.co/api/v2/pokedex/30/'
  },
  {
    order: 4,
    pokedexName: 'paldea',
    displayName: 'Paldea',
    group: 'sv',
    gameIconList: ['scarlet', 'violet'],
    pokemonEntries: 400,
    url: 'https://pokeapi.co/api/v2/pokedex/31/'
  },
  {
    order: 5,
    pokedexName: 'kitakami',
    displayName: 'Kitakami',
    group: 'sv',
    gameIconList: ['scarlet', 'violet'],
    pokemonEntries: 200,
    url: 'https://pokeapi.co/api/v2/pokedex/32/'
  },
  {
    order: 6,
    pokedexName: 'blueberry',
    displayName: 'Blueberry',
    group: 'sv',
    gameIconList: ['scarlet', 'violet'],
    pokemonEntries: 243, // HOME 240
    url: 'https://pokeapi.co/api/v2/pokedex/33/'
  },
  {
    order: 2,
    pokedexName: 'lumiose-city',
    displayName: 'Lumiose City',
    group: 'plza',
    gameIconList: ['plZA'],
    pokemonEntries: 232,
    url: 'https://pokeapi.co/api/v2/pokedex/34/'
  },
  {
    order: 3,
    pokedexName: 'hyperspace',
    displayName: 'Hyperspace',
    group: 'plza',
    gameIconList: ['plZA'],
    pokemonEntries: 132,
    url: 'https://pokeapi.co/api/v2/pokedex/35/'
  }
]

export const REFERENCE_DATA = {
  regions: REGIONS,
  types: TYPES,
  gameDexMap: ALL_POKEDEX_GROUPS
}
