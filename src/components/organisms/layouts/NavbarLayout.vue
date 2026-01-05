<template>
  <div class="navbar">
    <div class="navbar__top">
      <div class="title-container">
        <h1 @click="navigateToHome">{{ navbarTitle }}</h1>
      </div>
      <div class="icon-container">
        <el-icon
          class="icon layout-icon"
          @click="handleChangeLayoutType"
        >
          <Menu v-show="layoutStore.gridLayoutType === 'default'" />
          <Grid v-show="layoutStore.gridLayoutType === 'mini'" />
        </el-icon>
        <el-icon
          class="icon filter-icon"
          @click="handleClickAdvancedFilters"
          ><Filter
        /></el-icon>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBottomDrawerStore } from '@/stores/bottomDrawer.ts'
import { useFilterQueriesStore } from '@/stores/filterQueries.ts'
import { useLayoutStore } from '@/stores/userPreferences/layout'
import debounce from 'lodash/debounce'

const route = useRoute()
const router = useRouter()
const bottomDrawerStore = useBottomDrawerStore()
const filterQueriesStore = useFilterQueriesStore()
const layoutStore = useLayoutStore()

// ******************************
// DATA
// ******************************
const searchQuery = ref('')

const navbarTitle = computed(() => {
  if (route.name === 'GameDexDetail') {
    return route.params.pokedexName as string
  }
  return route.meta.title as string
})

// ******************************
// METHODS
// ******************************
const handleClickAdvancedFilters = () => {
  bottomDrawerStore.openDrawer('advanced-filters', '100%')
}
const handleChangeSearchQuery = debounce(() => {
  filterQueriesStore.setSearchQuery(searchQuery.value)
}, 250)

const handleChangeLayoutType = () => {
  layoutStore.toggleGridLayoutType()
}

const navigateToHome = () => {
  router.replace('/')
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  min-height: 120px;
  background-color: $NavbarBg;
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
  transition: background-color 0.5s ease;
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
  font-size: 30px;
  color: black;
  cursor: pointer;
  background-color: $SystemWhite;
  border-radius: 10px;
  padding: 5px;
  margin-left: 10px;
}

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
