import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterQueriesStore = defineStore('filterQueries', () => {
  // ******************************
  // State
  // ******************************
  const searchQuery = ref('')
  const selectedSortOption = ref<string>('number-asc')
  const selectedRegions = ref<string[]>([])
  const selectedTypes = ref<string[]>([])

  // ******************************
  // Actions
  // ******************************
  const setSearchQuery = (input: string) => {
    searchQuery.value = input.trim().toLowerCase()
  }
  const setSelectedSortOption = (selected: string) => {
    selectedSortOption.value = selected
  }
  const setSelectedRegion = (selected: string[]) => {
    selectedRegions.value = selected
  }
  const setSelectedTypes = (selected: string[]) => {
    selectedTypes.value = selected
  }

  return {
    searchQuery,
    selectedRegions,
    selectedTypes,
    selectedSortOption,
    setSearchQuery,
    setSelectedSortOption,
    setSelectedRegion,
    setSelectedTypes
  }
})
