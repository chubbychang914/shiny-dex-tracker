<script setup lang="ts">
import { ref } from 'vue'
import type { Region, RegionOption, SortBy,SortByOption } from '@/types'

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

const clickSettings = () => {
  console.log('clickSettings')
}

</script>

<template>
  <div class="navbar">
    <div class="navbar__top">
      <h1>Navbar</h1>
      <el-icon class="icon__settings" @click="clickSettings"><Setting /></el-icon>
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
        placeholder="Select"
        style="width: 240px"
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
        placeholder="Select"
        style="width: 240px"
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
  background-color: $PrimaryColor;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
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
    background-color: lightgrey;
    border-radius: 50%;
    padding: 5px;
  }
  &__settings {
    font-size: 30px;
    color: black;
    cursor: pointer;
    background-color: lightgrey;
    border-radius: 50%;
    padding: 5px;
  }
}
</style>
