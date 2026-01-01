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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedTab = ref('Home')

const menuItems = [
  {
    name: 'Home',
    icon: '/src/assets/images/squareIcons/pikachu-icon.jpg'
  },
  {
    name: 'National',
    icon: '/src/assets/images/squareIcons/bulbasaur-icon.jpg'
  },
  {
    name: 'Games',
    icon: '/src/assets/images/squareIcons/charmander-icon.jpg'
  },
  {
    name: 'Settings',
    icon: '/src/assets/images/squareIcons/squirtle-icon.jpg'
  }
]

const handleClick = (itemName: string) => {
  switch (itemName) {
    case 'Home':
      router.push('/')
      selectedTab.value = 'Home'
      break
    case 'National':
      router.push('/national-dex')
      selectedTab.value = 'National'
      break
    case 'Games':
      router.push('/game-dex')
      selectedTab.value = 'Games'
      break
    case 'Settings':
      router.push('/settings')
      selectedTab.value = 'Settings'
      break
    default:
      break
  }
}
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
    background-color 0.5s ease,
    color 0.5s ease;

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
