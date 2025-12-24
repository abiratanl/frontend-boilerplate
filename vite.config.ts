import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Kept your existing configuration for path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Added Docker configuration
  server: {
    host: true, // Necessary to expose the app outside the container
    port: 5173, // Forces the default port
    watch: {
      usePolling: true, // Fix for hot-reload issues in some Docker environments (Windows/WSL)
    },
  },
})