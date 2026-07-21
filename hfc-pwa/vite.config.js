import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'node:fs'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: {
      key: fs.readFileSync('./172.16.3.218+1-key.pem'),
      cert: fs.readFileSync('./172.16.3.218+1.pem'),
    },
    allowedHosts: [
      '172.16.3.218',
      'localhost',
      '127.0.0.1',
    ],
  },
})