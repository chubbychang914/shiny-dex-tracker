<template>
  <div class="settings-view">
    <div class="settings-container">
      <h1>settings page</h1>
      <div class="theme-container">
        <div class="theme-item">
          <div class="theme-item__title">Theme</div>
          <div
            class="theme-item__value"
            v-for="theme in themeOptions"
            :key="theme.name"
            @click="handleSetTheme(theme.value)"
          >
            {{ theme.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.ts'
import type { Theme } from '@/types'

const themeStore = useThemeStore()

const themeOptions = [
  {
    name: 'Pokeball',
    value: 'pokeball'
  },
  {
    name: 'Greatball',
    value: 'greatball'
  },
  {
    name: 'Masterball',
    value: 'masterball'
  }
]

const handleSetTheme = (theme: Theme) => {
  console.log('⭐️handleSetTheme', theme)
  themeStore.setTheme(theme)
}
</script>

<style lang="scss" scoped></style>
