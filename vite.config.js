import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ['./index.html', './src/**/*.{js,jsx}'],
        theme: {
          extend: {
            colors: {
              primary: '#62BEFF', // Define your color here
              secondary: '#0D0D0D'
            }
          }
        }
      }
    })
  ]
})