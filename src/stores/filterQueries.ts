import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Region, SortBy } from '@/types'

export const useFilterQueriesStore = defineStore('filterQueries', () => {
  // State
  const searchQuery = ref('')
  const selectedRegion = ref<Region>('all')
  const selectedSortOption = ref<SortBy>('number-asc')

  // Actions
  const setSearchQuery = (input: string) => {
    searchQuery.value = input.trim().toLowerCase()
  }
  const setSelectedRegion = (selected: Region) => {
    selectedRegion.value = selected
  }
  const setSelectedSortOption = (selected: SortBy) => {
    selectedSortOption.value = selected
  }

  return {
    searchQuery,
    selectedRegion,
    selectedSortOption,
    setSearchQuery,
    setSelectedRegion,
    setSelectedSortOption
  }
})
