import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/add': 'http://localhost:3000',
      '/get': 'http://localhost:3000',
      '/update': 'http://localhost:3000',
      '/delete': 'http://localhost:3000',
      '/edit': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
    }
  }
})
