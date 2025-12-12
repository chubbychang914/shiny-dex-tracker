import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/reset.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme.ts'
import { usePokeApiDataStore } from './stores/pokeApiData.ts'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(createPinia())

// 初始化 pokedex 資訊
const pokeApiDataStore = usePokeApiDataStore()
await pokeApiDataStore.initData()

const themeStore = useThemeStore()
themeStore.setTheme(themeStore.currentTheme) // 設定主題

app.use(router)

app.mount('#app')
