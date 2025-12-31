<template>
  <div class="footer-container">
    <div class="footer-content">
      <div
        v-for="item in menuItems"
        :key="item.name"
        class="footer-item"
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
import { useRouter } from 'vue-router'
import { useBottomDrawerStore } from '@/stores/bottomDrawer.ts'

const router = useRouter()
const bottomDrawerStore = useBottomDrawerStore()

const menuItems = [
  {
    name: 'Home',
    icon: '/src/assets/images/pikachu.jpeg'
  },
  {
    name: 'National',
    icon: '/src/assets/images/pikachu.jpeg'
  },
  {
    name: 'Games',
    icon: '/src/assets/images/pikachu.jpeg'
  },
  {
    name: 'Settings',
    icon: '/src/assets/images/pikachu.jpeg'
  }
]

const handleClick = (itemName: string) => {
  switch (itemName) {
    case 'Home':
      router.push('/')
      break
    case 'National':
      router.push('/national-dex')
      break
    case 'Games':
      router.push('/game-dex')
      break
    case 'Settings':
      bottomDrawerStore.openDrawer('settings', '90%')
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
  padding: 10px 0;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  background-color: teal;
}
.footer-content {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.footer-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
    }
  }
}
</style>
