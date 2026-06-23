import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercepta chamadas locais para /api/trefle e joga para a API real
      // O changeOrigin: true é o que engana a Trefle para não dar erro de CORS
      '/api/trefle': {
        target: 'https://trefle.io/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/trefle/, ''),
      },
    },
  },
})
