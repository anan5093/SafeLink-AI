import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/SafeLink-AI/',   // 👈 EXACT repo name, case-sensitive
  plugins: [react()],
})

