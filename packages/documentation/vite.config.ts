import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'expo_dist',
    reportCompressedSize: true,
  },
  clearScreen: true,
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },

  logLevel: 'info',
  plugins: [react(), svgr()],
  publicDir: 'public',
});
