import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import NationalDexView from '@/views/NationalDexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'NationalDex',
      component: NationalDexView
    },
    {
      path: '/game-dex',
      name: 'GameDex',
      component: defineAsyncComponent(() => import('../views/GameDexView.vue')),
    },

  ],
})

export default router
