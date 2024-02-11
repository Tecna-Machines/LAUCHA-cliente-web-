// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
      rollupOptions: {
        input: {
          dashboard: resolve(__dirname, 'src/pages/dashboard.html'),
          empleado: resolve(__dirname, 'src/pages/empleados.html'),
          contrato: resolve(__dirname, 'src/pages/contrato-nuevo.html')
          // Agrega aquí las demás páginas
        },
      },
    },
  })
  