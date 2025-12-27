/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),],
  
  // Kept your existing configuration for path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Added Docker configuration (Kept as is)
  server: {
    host: true, // Necessary to expose the app outside the container
    port: 5173, // Forces the default port
    watch: {
      usePolling: true, // Fix for hot-reload issues in some Docker environments (Windows/WSL)
    },
  },

  // New Test Configuration
  test: {
    globals: true, // Allows using describe, it, expect without importing
    environment: 'jsdom', // Simulates a browser environment for React components
    setupFiles: './src/setupTests.ts', // Points to your setup file
    css: true, // Processes CSS files (important for Tailwind classes in tests)
  },
})