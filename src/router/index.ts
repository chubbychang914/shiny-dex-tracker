import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '@/views/PokedexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Pokedex',
      component: PokedexView
    },
    {
      path: '/test',
      name: 'Test',
      component: defineAsyncComponent(() => import('../views/TestView.vue')),
    },

  ],
})

export default router
