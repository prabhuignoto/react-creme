import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

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
      },
    },
  },
  cacheDir: '.vite_cache',
  clearScreen: true,
  logLevel: 'info',
  mode: 'universal',
  plugins: [reactRefresh(), svgr()],
});
