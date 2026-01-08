<template>
  <div class="advanced-filters">
    <div class="main-header-container">
      <div class="main-header-container__title"></div>
      <div class="main-header-container__actions">
        <div
          class="clear"
          @click="handleResetAllFilter"
        >
          Reset Filter
        </div>
        <div
          class="close"
          @click="handleCloseFilter"
        >
          <el-icon :size="30"><CircleCloseFilled /></el-icon>
        </div>
      </div>
    </div>
    <div class="main-content-container">
      <div class="sort-by-container">
        <div class="sort-by-container__title">Sort By</div>
        <div class="sort-by-container__content">
          <div class="custom-radio-group-container">
            <div
              v-for="option in sortOptions"
              :key="option.value"
              class="custom-radio-button"
              :class="{ 'custom-radio-button__selected': selectedSortOption === option.value }"
              @click="handleChangeSortOption(option.value)"
            >
              {{ option.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="region-container">
        <div class="region-container__title">
          <span>Origin Regions</span>
          <span
            v-show="selectedRegions.length"
            class="clear-all-btn"
            @click="handlePartialClear('regions')"
            >Clear all</span
          >
        </div>
        <div class="region-container__content">
          <div
            v-for="region in allRegions"
            :key="region.value"
            class="region-container__item"
            :class="{ 'region-selected': selectedRegions.includes(region.value) }"
            @click="handleSelectRegion(region.value)"
          >
            {{ region.label }}
          </div>
        </div>
      </div>
      <div class="type-container">
        <div class="type-container__title">
          <span>Types</span>
          <span
            v-show="selectedTypes.length"
            class="clear-all-btn"
            @click="handlePartialClear('types')"
            >Clear all</span
          >
        </div>
        <div class="type-container__content">
          <div
            v-for="type in allTypes"
            :key="type"
            class="image-container"
            :class="{ 'image-container__selected': selectedTypes.includes(type) }"
          >
            <img
              :src="getTypeIcon(type)"
              :alt="`${type}-type-icon`"
              @click="handleSelectType(type)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="main-footer-container">
      <div class="apply-button-container">
        <BaseButton
          btnSize="large"
          btnColor="blue"
          btnText="Apply Filter"
          @onClick="handleApplyFilter"
        >
          <template #icon>
            <el-icon
              class="apply-icon"
              :size="30"
              ><Check
            /></el-icon>
          </template>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'
import { computed, ref, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBottomDrawerStore } from '@/stores/bottomDrawer'
import { useFilterQueriesStore } from '@/stores/filterQueries'
import { capitalizeFirstLetter } from '@/utils/helpers'
import { REFERENCE_DATA } from '@/constants/referenceData'
import { getSingleDexFilter, clearSingleDexFilter, saveDexFiltersToStorage } from '@/utils/localStorageDB/dexFilters.ts'
import type { DexFiltersType } from '@/types'

const route = useRoute()
const bottomDrawerStore = useBottomDrawerStore()
const filterQueriesStore = useFilterQueriesStore()

// ******************************
// STATE
// ******************************
const DEFAULT_FILTERS = {
  sortBy: 'number-asc',
  regions: [],
  types: []
} as DexFiltersType
const allTypes = REFERENCE_DATA.types
const selectedSortOption = ref<string>('number-asc')
const selectedRegions = ref<string[]>([])
const selectedTypes = ref<string[]>([])

const dexName = computed(() => {
  return route.path.split('/').pop() as string
})

const sortOptions = ref<{ value: string; label: string }[]>([
  { value: 'number-asc', label: 'Num ⤴' },
  { value: 'number-desc', label: 'Num ⤵' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' }
])

const allRegions = computed(() => {
  const filteredRegions = REFERENCE_DATA.regions.map((region) => {
    return {
      value: region,
      label: capitalizeFirstLetter(region)
    }
  })

  return filteredRegions
})

const typeIcons: Record<string, string> = import.meta.glob('/src/assets/images/typeIcons/*.png', {
  eager: true,
  import: 'default'
})

// ******************************
// METHODS
// ******************************
// Change sort option
const handleChangeSortOption = (option: string) => {
  selectedSortOption.value = option
}

// Select region
const handleSelectRegion = (region: string) => {
  const index = selectedRegions.value.indexOf(region)
  if (index > -1) {
    selectedRegions.value.splice(index, 1)
  } else {
    selectedRegions.value.push(region)
  }
}

const getTypeIcon = (type: string) => {
  const iconPath = `/src/assets/images/typeIcons/${type}.png`
  return typeIcons[iconPath] || ''
}

const handleSelectType = (type: string) => {
  const index = selectedTypes.value.indexOf(type)
  if (index > -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    selectedTypes.value.push(type)
  }
}

const loadSavedDexFilter = () => {
  const savedFilter = getSingleDexFilter(dexName.value) || DEFAULT_FILTERS
  selectedSortOption.value = savedFilter.sortBy
  selectedRegions.value = savedFilter.regions
  selectedTypes.value = savedFilter.types
}

const handlePartialClear = (block: string) => {
  switch (block) {
    case 'regions':
      selectedRegions.value = []
      break
    case 'types':
      selectedTypes.value = []
      break
    default:
      break
  }
}

const handleCloseFilter = () => {
  bottomDrawerStore.closeDrawer()
}

const handleResetAllFilter = () => {
  filterQueriesStore.setSelectedSortOption(DEFAULT_FILTERS.sortBy)
  filterQueriesStore.setSelectedRegion(DEFAULT_FILTERS.regions)
  filterQueriesStore.setSelectedTypes(DEFAULT_FILTERS.types)
  clearSingleDexFilter(dexName.value)
  saveDexFiltersToStorage(dexName.value, DEFAULT_FILTERS)
  nextTick(() => {
    bottomDrawerStore.closeDrawer()
  })
}

const handleApplyFilter = () => {
  filterQueriesStore.setSelectedSortOption(selectedSortOption.value)
  filterQueriesStore.setSelectedRegion(selectedRegions.value)
  filterQueriesStore.setSelectedTypes(selectedTypes.value)
  saveDexFiltersToStorage(dexName.value, {
    sortBy: selectedSortOption.value,
    regions: selectedRegions.value,
    types: selectedTypes.value
  })
  nextTick(() => {
    bottomDrawerStore.closeDrawer()
  })
}
// ******************************
// WATCHERS
// ******************************
watch(
  () => bottomDrawerStore.isOpen,
  (newVal) => {
    if (newVal) loadSavedDexFilter()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
$headerHeight: 60px;
$footerHeight: 60px;
$titleFontSize: 1.2rem;

.advanced-filters {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-header-container {
  width: 100%;
  height: $headerHeight;
  overflow: hidden;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $NavbarBg;

  &__title {
    font-size: $titleFontSize;
  }

  &__actions {
    display: flex;
    gap: 10px;
  }
}

.main-content-container {
  width: 100%;
  padding: 10px 10px 15px;
  flex: 1;
  min-height: 0;
  overflow-y: scroll;
}

.main-footer-container {
  width: 100%;
  overflow: hidden;
  @extend %center;
  padding-bottom: calc(12px + constant(safe-area-inset-bottom));
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.sort-by-container {
  width: 100%;
  padding-bottom: 20px;
  &__title {
    width: 100%;
    font-size: $titleFontSize;
  }
  &__content {
    width: 100%;
  }
}

.custom-radio-group-container {
  width: 100%;
  border: 1px solid $NavbarBg;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 10px;
  overflow: hidden;

  .custom-radio-button {
    border-right: 1px solid $NavbarBg;
    @extend %center;
    padding: 10px;
    transition:
      background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.3s ease,
      transform 0.1s ease;

    &:last-of-type {
      border-right: none;
    }

    &__selected {
      background-color: $SystemWhite;
      color: $SystemBlack;
    }
  }
}

.region-container {
  width: 100%;
  padding-bottom: 20px;

  &__title {
    width: 100%;
    font-size: $titleFontSize;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  &__item {
    width: 100%;
    padding: 10px;
    border: 1px solid $NavbarBg;
    border-radius: 10px;
    @extend %center;
  }
  .region-selected {
    background-color: $SystemWhite;
    color: $SystemBlack;
  }
}

.type-container {
  width: 100%;
  &__title {
    width: 100%;
    font-size: $titleFontSize;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

.apply-button-container {
  width: 90%;
  .apply-icon {
    margin-right: 10px;
  }
}

.image-container {
  width: 100%;
  height: auto;
  padding: 10px;
  @extend %center;
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    outline 0.1s ease,
    outline-offset 0.1s ease,
    border-radius 0.1s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__selected {
    transform: scale(0.88); // 明顯縮小
    outline: 1px solid $NavbarBg;
    border-radius: 50px;
    img {
      filter: brightness(0.5); // 明顯變暗
    }
  }
}

.clear {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.1s ease;
  color: inherit;

  &:active {
    transform: scale(0.95);
  }
}

.close {
  cursor: pointer;
  user-select: none;
}

.clear-all-btn {
  cursor: pointer;
  user-select: none;
  font-size: 0.9rem;
  font-weight: 500;
}

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
