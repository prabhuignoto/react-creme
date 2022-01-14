import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svgLoader()],
  logLevel: 'info',
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
