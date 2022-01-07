import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import reactSVG from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactSVG()],
  logLevel: 'warn',
  cacheDir: '.vite_cache',
  mode: 'universal',
  build: {
    outDir: 'expo_dist',
    reportCompressedSize: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        unused: true,
      }
    }
  }
})
