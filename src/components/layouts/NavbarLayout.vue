<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Region, SortBy, SortByOption } from '@/types'
import { capitalizeFirstLetter } from '@/utils/helpers.ts'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useBottomDrawerStore } from '@/stores/bottomDrawer.ts'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'

const pokeApiDataStore = usePokeApiDataStore()
const bottomDrawerStore = useBottomDrawerStore()
const filterQueriesStore = useFilterQueriesStore()

// ==============================
// Data
// ==============================
const searchQuery = ref('')
const selectedRegion = ref<Region>('all')
const selectedSortOption = ref<SortBy>('number-asc')

const sortOptions = ref<SortByOption[]>([
  { value: 'number-asc', label: 'Number Ascending' },
  { value: 'number-desc', label: 'Number Descending' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' }
])

const regionOptions = computed(() => {
  const allRegionOption = {
    value: 'all',
    label: 'All Regions'
  }
  const filteredRegions = pokeApiDataStore.referenceData.regions
    .filter(region => region !== 'hisui') // Remove Hisui Option for now
    .map(region => {
      return {
        value: region,
        label: capitalizeFirstLetter(region)
      }
  })

  return [allRegionOption, ...filteredRegions]
})

// ==============================
// Methods
// ==============================
const handleClickSettings = () => {
  bottomDrawerStore.openDrawer('settings')
}
const handleClickAdvancedFilters = () => {
  bottomDrawerStore.openDrawer('advanced-filters', '80%')
}
const handleChangeSearchQuery = () => {
  filterQueriesStore.setSearchQuery(searchQuery.value)
}
const handleChangeRegion = () => {
  filterQueriesStore.setSelectedRegion(selectedRegion.value)
  console.log('✨selectedRegion', selectedRegion.value)
}
const handleChangeSortOption = () => {
  filterQueriesStore.setSelectedSortOption(selectedSortOption.value)
  console.log('✨selectedSortOption', selectedSortOption.value)
}
</script>

<template>
  <div class="navbar">
    <div class="navbar__top">
      <h1>Navbar</h1>
      <div class="icon-container">
        <el-icon class="icon__settings" @click="handleClickAdvancedFilters"><Filter /></el-icon>
        <el-icon class="icon__settings" @click="handleClickSettings"><Setting /></el-icon>
      </div>
    </div>
    <div class="navbar__middle">
      <el-input
        v-model="searchQuery"
        style="width: 100%"
        size="large"
        placeholder="Search by name or number"
        clearable
        @input="handleChangeSearchQuery"
      />
    </div>
    <div class="navbar__bottom">
      <el-select
        v-model="selectedRegion"
        style="width: 100%"
        @change="handleChangeRegion"
      >
        <el-option
          v-for="item in regionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="selectedSortOption"
        style="width: 100%"
        @change="handleChangeSortOption"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  background-color: $color-primary;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  color: $color-text;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
.icon {
  &__filter {
    font-size: 30px;
    color: black;
    cursor: pointer;
    background-color: $color-icon-background;
    border-radius: 50%;
    padding: 5px;
  }
  &__settings {
    font-size: 30px;
    color: black;
    cursor: pointer;
    background-color: $color-icon-background;
    border-radius: 10px;
    padding: 5px;
    margin-left: 10px;
  }
}
</style>
