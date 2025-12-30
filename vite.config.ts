/* eslint-disable */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    /* ⚙️ PWA Settings **/
    VitePWA({
      registerType: 'autoUpdate', // 升級版本會自動更新
      devOptions: {
        enabled: true,
      },
      // ====================================================================================================
      // 📱 Manifest: Tells devices how to display your installed app
      // ====================================================================================================
      manifest: { // PWA 的設定
        name: 'Pokédex Tracker',                          // REQUIRED: Full app name (install prompt)
        short_name: 'Pokédex Tracker',                    // OPTIONAL: Under home screen icon (recommended)
        description: 'Track your Pokémon collection!',    // OPTIONAL: Install prompt description
        // theme_color: '#ffffff',                        // OPTIONAL: Status bar color
        // background_color: '#ffffff',                   // OPTIONAL: Splash screen background
        display: 'standalone',                            // OPTIONAL (default: 'browser'): 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
        icons: [
          { src: '/launcherIcon/192-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/launcherIcon/512-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/launcherIcon/512-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable'}
        ]
      },
      // ====================================================================================================
      // 🧰 Workbox: Builds Service Worker for offline caching
      // ====================================================================================================
      workbox: {
        // ==================================================
        // PRECACHE: Your app files (HTML, JS, CSS, JSON, icons)
        // Cached at install → instant offline access
        // ==================================================
        globPatterns: ['**/*.{js,css,html,json,png,svg,ico}'], // "Find ALL files, in ANY directory (including subdirectories), that end with .js, .css, .html, .json, .png, .svg, or .ico"

        // ==================================================
        // RUNTIME CACHE: External Pokémon sprites from GitHub
        // Cached as users browse → offline after first view
        // ==================================================
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/.*/i, // REQUIRED: What URLs to cache
            handler: 'CacheFirst',                                                       // REQUIRED: How to cache (options: 'CacheFirst', 'NetworkFirst', 'StaleWhileRevalidate', 'NetworkOnly', 'CacheOnly')
            options: {
              cacheName: 'pokemon-sprites',                                              // OPTIONAL: Cache name (default: auto-generated) -> Name in DevTools
              expiration: {                                                              // OPTIONAL: Cache cleanup rules -> 3000 max images, delete after 1 year
                maxEntries: 3000,                                                        // OPTIONAL: Max items (default: unlimited)
                maxAgeSeconds: 60 * 60 * 24 * 365                                        // OPTIONAL: Max age (default: unlimited)
              },
              cacheableResponse: {                                                       // OPTIONAL: What to cache -> Only cache successful responses (200 OK, 0 = CORS)
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variable.scss" as *;`
      },
    },
  },
  server: { // DELETE on production
    host: '0.0.0.0',
    port: 5173,
  }
})
