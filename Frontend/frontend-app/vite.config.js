import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto para el frontend
    proxy: {
      // Opcional: Para evitar problemas de CORS en desarrollo sin configurar el backend
      // '/api': {
      //   target: 'http://localhost:8085', // Tu API Gateway
      //   changeOrigin: true,
      //   secure: false,
      // }
    }
  }
})