import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: '/mips-journey-site-v2/',
  plugins: [react()],
})
