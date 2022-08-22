import react from '@vitejs/plugin-react';
import path from 'path';
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
  resolve: {
    alias: {
      '@design': path.resolve(__dirname, '../lib/design'),
      '@icons': path.resolve(__dirname, '../lib/icons'),
    },
  },
});
