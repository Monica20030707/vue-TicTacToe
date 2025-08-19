import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [vue()],
    }
  } else {
    // command === 'build'
    return {
      base: '/vue-TicTacToe/',
      plugins: [vue()],
    }
  }
})