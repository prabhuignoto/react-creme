import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'expo_dist',
    reportCompressedSize: true,
  },
  // cacheDir: '.vite_cache',
  clearScreen: true,
  logLevel: 'info',
  // mode: 'universal',
  plugins: [react(), svgr()],
  publicDir: 'public',
});
