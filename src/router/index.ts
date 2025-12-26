import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/national-dex',
      name: 'NationalDex',
      component: () => import('@/views/NationalDexView.vue'),
      meta: {
        title: 'National Dex'
      }
    },
    {
      path: '/game-dex',
      name: 'GameDexList',
      component: () => import('@/views/GameDexView.vue'),
      meta: {
        title: 'Game Dex'
      }
    },
    {
      path: '/game-dex/:pokedexName',
      name: 'GameDexDetail',
      component: () => import('@/views/GameDexDetailView.vue')
    }
  ]
})

export default router
