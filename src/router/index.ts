import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/national-dex',
      name: 'NationalDex',
      component: () => import('@/views/NationalDexView.vue')
    },
    {
      path: '/game-dex',
      name: 'GameDexList',
      component: () => import('@/views/GameDexView.vue')
    },
    {
      path: '/game-dex/:pokedexName',
      name: 'GameDexDetail',
      component: () => import('@/views/GameDexDetailView.vue')
    }
  ]
})

export default router
