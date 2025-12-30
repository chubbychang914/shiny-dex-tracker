import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SortFilter, RegionFilter, TypeFilter } from '@/types'

export const useFilterQueriesStore = defineStore('filterQueries', () => {
  // ==============================
  // State
  // ==============================
  const searchQuery = ref('')
  const selectedSortOption = ref<SortFilter>('number-asc')
  const selectedRegions = ref<RegionFilter>([])
  const selectedTypes = ref<TypeFilter>([])

  // ==============================
  // Actions
  // ==============================
  const setSearchQuery = (input: string) => {
    searchQuery.value = input.trim().toLowerCase()
  }
  const setSelectedRegion = (selected: RegionFilter) => {
    selectedRegions.value = selected
  }
  const setSelectedSortOption = (selected: SortFilter) => {
    selectedSortOption.value = selected
  }
  const setSelectedTypes = (selected: TypeFilter) => {
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
