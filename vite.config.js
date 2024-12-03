import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: 'client/dist',
    chunkSizeWarningLimit: 1000,  // Adjust the warning limit to a higher value
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle all third-party libraries into 'vendor.js'
          }
          if (id.includes('mapbox-gl')) {
            return 'mapbox'; // Create a separate chunk for Mapbox
          }
        }
      }
    }
  }
})