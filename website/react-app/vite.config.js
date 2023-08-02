import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
//   server:{
//     proxy: {
//       '/user': 'http://127.0.0.1:8000'
//     }
// },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: {
    proxy: {
      // '/api': {
      //   target: 'https://graph.mapillary.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // },
      '/api': {
        target: 'https://tiles.mapillary.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
