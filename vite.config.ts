import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: path.resolve(__dirname, './public'),
  server: {
    fs: {
      // Restrict serving files to only the public and src directories
      allow: [
        path.resolve(__dirname, './public'),
        path.resolve(__dirname, './src')
      ]
    }
  }
})
