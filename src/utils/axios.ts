import axios from 'axios'

export const pokeApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://pokeapi.co/api/v2'
})
