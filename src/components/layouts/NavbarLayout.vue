<script setup lang="ts">
import { ref } from 'vue'
import type { Region, RegionOption, SortBy, SortByOption } from '@/types'
import { useBottomDrawerStore } from '@/stores/bottomDrawer.ts'
const bottomDrawerStore = useBottomDrawerStore()

// Data ==============================
const searchQuery = ref('')
const selectedRegion = ref<Region>('all')
const selectedSortOption = ref<SortBy>('number-asc')
const regionOptions = ref<RegionOption[]>([
  { value: 'all', label: 'All Regions' },
  { value: 'kanto', label: 'Kanto' },
  { value: 'johto', label: 'Johto' },
  { value: 'hoenn', label: 'Hoenn' },
  { value: 'sinnoh', label: 'Sinnoh' },
  { value: 'unova', label: 'Unova' },
  { value: 'kalos', label: 'Kalos' },
])
const sortOptions = ref<SortByOption[]>([
  { value: 'number-asc', label: 'Number Ascending' },
  { value: 'number-desc', label: 'Number Descending' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' }
])

// Methods ==============================
const handleClickSettings = () => {
  bottomDrawerStore.openDrawer('settings')
}
const handleClickAdvancedFilters = () => {
  bottomDrawerStore.openDrawer('advanced-filters')
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
      />
    </div>
    <div class="navbar__bottom">
      <el-select
        v-model="selectedRegion"
        style="width: 100%"
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
