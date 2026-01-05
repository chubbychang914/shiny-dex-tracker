import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/reset.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { usePokeApiDataStore } from './stores/pokeApiData.ts'
import { useThemeStore } from './stores/userPreferences/theme.ts'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(createPinia())

// Initialize to apply theme on load
useThemeStore()

// Initialize Basic Pokemon Data
const pokeApiDataStore = usePokeApiDataStore()
await pokeApiDataStore.initData()

app.use(router)

app.mount('#app')
