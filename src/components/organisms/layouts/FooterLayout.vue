<template>
  <div class="footer-container">
    <div class="footer-content">
      <div
        v-for="item in menuItems"
        :key="item.name"
        class="footer-item"
        :class="{ 'footer-item__selected': selectedTab === item.name }"
      >
        <div
          class="item-card"
          @click="handleClick(item.name)"
        >
          <div class="icon-container">
            <img
              :src="item.icon"
              :alt="item.name"
            />
          </div>
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const MENU_ITEMS: { name: string; icon: string; path: string }[] = [
  {
    name: 'Home',
    icon: '/src/assets/images/squareIcons/pikachu-icon.jpg',
    path: '/'
  },
  {
    name: 'National',
    icon: '/src/assets/images/squareIcons/bulbasaur-icon.jpg',
    path: '/national-dex'
  },
  {
    name: 'Games',
    icon: '/src/assets/images/squareIcons/charmander-icon.jpg',
    path: '/game-dex'
  },
  {
    name: 'Settings',
    icon: '/src/assets/images/squareIcons/squirtle-icon.jpg',
    path: '/settings'
  }
]

const route = useRoute()
const router = useRouter()
const selectedTab = ref<string>('') // 'Home', 'National', 'Games', 'Settings'
const menuItems = MENU_ITEMS

// ******************************
// METHODS
// ******************************
const getTabFromPath = (currentPath: string) => {
  if (currentPath === '/') return 'Home'
  if (currentPath.startsWith('/national-dex')) return 'National'
  if (currentPath.startsWith('/game-dex')) return 'Games'
  if (currentPath.startsWith('/settings')) return 'Settings'
  return 'Home'
}

const handleClick = (itemName: string) => {
  switch (itemName) {
    case 'Home':
      router.replace('/')
      break
    case 'National':
      router.replace('/national-dex')
      break
    case 'Games':
      router.replace('/game-dex')
      break
    case 'Settings':
      router.replace('/settings')
      break
    default:
      break
  }
}

// ******************************
// WATCHERS
// ******************************
watch(
  () => route.path,
  (newPath) => {
    selectedTab.value = getTabFromPath(newPath)
  }
)

// ******************************
// LIFECYCLE HOOKS
// ******************************
onMounted(() => {
  selectedTab.value = getTabFromPath(route.path)
})
</script>

<style lang="scss" scoped>
$footerHeight: 72px;
$iconSize: 28px;

.footer-container {
  width: 100%;
  min-height: $footerHeight;
  height: calc($footerHeight + env(safe-area-inset-bottom));
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  background-color: $FooterBg;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  color: black;
}
.footer-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  transition:
    background-color 0.25s ease,
    color 0.25s ease;

  &__selected {
    background-color: $NavbarBg;
    color: $TextPrimary;
  }
}
.item-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .icon-container {
    width: $iconSize;
    height: $iconSize;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }
}
</style>
