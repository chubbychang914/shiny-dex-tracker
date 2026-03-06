<template>
  <div class="game-dex-view">
    <div class="title-container">
      <div
        class="title"
        v-for="game in gameDexMap"
        :key="game.pokedexName"
        @click="navigateToGameDex(game.pokedexName)"
      >
        <div class="title__icon-area">
          <div
            class="image-container"
            v-for="icon in game.gameIconList"
            :key="icon"
          >
            <img
              :src="GAME_ICONS[icon]"
              alt="game-dex-icon"
            />
          </div>
        </div>
        <div class="title__text-area">
          {{ `${game.displayName} Pokedex` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { REFERENCE_DATA, GAME_ICONS } from '@/constants/referenceData'

const router = useRouter()

const gameDexMap = computed(() => {
  return REFERENCE_DATA.gameDexMap.filter((game) => game.pokedexName !== 'national').sort((a, b) => a.order - b.order)
})

const navigateToGameDex = (pokedexName: string) => {
  router.push(`/game-dex/${pokedexName}`)
}
</script>

<style lang="scss" scoped>
$gameIconWidth: 30px;
.game-dex-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.title-container {
  width: 100%;
  max-height: 100%;
  padding: 25px 15px 100px;
  overflow-y: auto;
}
.title {
  background-color: $NavbarBg;
  width: 100%;
  padding: 15px 15px 15px 12px;
  margin-bottom: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &__icon-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc($gameIconWidth * 2 + 5px);
    .image-container {
      width: $gameIconWidth;
      height: $gameIconWidth;
    }
  }

  &__text-area {
    color: $TextPrimary;
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 15px;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
