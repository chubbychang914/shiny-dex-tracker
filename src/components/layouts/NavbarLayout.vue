<template>
  <div class="navbar">
    <div class="navbar__top">
      <div class="title-container">
        <el-icon
          v-if="route.path !== '/'"
          class="icon__back"
          @click="router.back()"
          ><ArrowLeft
        /></el-icon>
        <h1 @click="navigateToHome">{{ navbarTitle }}</h1>
      </div>
      <div class="icon-container">
        <!-- <el-icon
          class="icon__layout"
          @click="handleChangeLayoutType"
          ><Grid
        /></el-icon> -->
        <el-icon
          class="icon__filters"
          @click="handleClickAdvancedFilters"
          ><Filter
        /></el-icon>
        <el-icon
          class="icon__settings"
          @click="handleClickSettings"
          ><Setting
        /></el-icon>
      </div>
    </div>
    <div
      class="navbar__middle"
      v-show="showFilters"
    >
      <el-input
        v-model="searchQuery"
        style="width: 100%"
        size="large"
        placeholder="Search by name or number"
        clearable
        @input="handleChangeSearchQuery"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Region, SortBy, SortByOption } from '@/types'
import { capitalizeFirstLetter } from '@/utils/helpers.ts'
import { usePokeApiDataStore } from '@/stores/pokeApiData'
import { useBottomDrawerStore } from '@/stores/bottomDrawer.ts'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import { useLayoutStore } from '@/stores/layout.ts'
import debounce from 'lodash/debounce'

const route = useRoute()
const router = useRouter()
const pokeApiDataStore = usePokeApiDataStore()
const bottomDrawerStore = useBottomDrawerStore()
const filterQueriesStore = useFilterQueriesStore()
const layoutStore = useLayoutStore()
// ==============================
// Data
// ==============================
const searchQuery = ref('')

const showFilters = computed(() => {
  return route.path !== '/' && route.path !== '/game-dex'
})

const navbarTitle = computed(() => {
  if (route.name === 'GameDexDetail') {
    return route.params.pokedexName as string
  }
  return route.meta.title as string
})

// ==============================
// Methods
// ==============================
const handleClickSettings = () => {
  bottomDrawerStore.openDrawer('settings')
}
const handleClickAdvancedFilters = () => {
  bottomDrawerStore.openDrawer('advanced-filters', '95%')
}
const handleChangeSearchQuery = debounce(() => {
  filterQueriesStore.setSearchQuery(searchQuery.value)
}, 250)

const handleChangeLayoutType = () => {
  layoutStore.setLayoutType('mini')
}

const navigateToHome = () => {
  router.replace('/')
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  max-height: 100px;
  // background-color: $color-primary;
  background-color: red;
  color: $TextPrimary;
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
    @extend %center;
    gap: 10px;
  }
}
.title-container {
  @extend %center;
  gap: 15px;
}
.icon-container {
  display: flex;
  align-items: center;
}
.icon {
  &__layout {
    font-size: 25px;
  }
  &__settings {
    font-size: 30px;
    color: black;
    cursor: pointer;
    background-color: $BgPrimary;
    border-radius: 10px;
    padding: 5px;
    margin-left: 10px;
  }
}

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
