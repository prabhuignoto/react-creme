import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import reactSVG from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
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
  },
  cacheDir: '.vite_cache',
  logLevel: 'info',
  mode: 'universal',
  plugins: [reactRefresh(), reactSVG()]
})
