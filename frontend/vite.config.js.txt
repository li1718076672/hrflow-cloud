import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 后端地址
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})