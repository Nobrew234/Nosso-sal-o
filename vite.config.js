import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
export default defineConfig({
  base: './',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [{
    name: 'static-motion',
    generateBundle() {
      this.emitFile({type: 'asset', fileName: 'motion.js', source: readFileSync(new URL('./motion.js', import.meta.url))})
    }
  }]
})
