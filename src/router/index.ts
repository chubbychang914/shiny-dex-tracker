import { defineAsyncComponent } from 'vue'
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
      component: defineAsyncComponent(() => import('@/views/NationalDexView.vue'))
    },
    {
      path: '/game-dex',
      name: 'GameDex',
      component: defineAsyncComponent(() => import('@/views/GameDexView.vue')),
    },

  ],
})

export default router
