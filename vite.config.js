import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/trefle': {
        target: 'https://trefle.io/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/trefle/, ''),
      },
    },
  },
})
