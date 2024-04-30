import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@src': '/src',
      '@components': '/src/Components',
      '@hooks': '/src/Hooks',
      '@context': '/src/Context',
      '@pages': '/src/Pages',
      '@routers': '/src/Routers',
      '@utils': '/src/utils',
      '@layouts': '/src/Layouts',
      '@auth': '/src/auth',
      '@schemas': '/src/Schemas',
    },
  },
})
