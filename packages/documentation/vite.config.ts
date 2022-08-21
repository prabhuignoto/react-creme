import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

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
  plugins: [tsconfigPaths(), react(), svgr()],
  publicDir: 'public',
  resolve: {
    alias: [
      {
        find: '@core',
        replacement: path.resolve(__dirname, '../lib/components/core/'),
      },
      {
        find: '@overlay',
        replacement: path.resolve(__dirname, '../lib/components/overlay/'),
      },
      {
        find: '@inputs',
        replacement: path.resolve(__dirname, '../lib/components/inputs/'),
      },
      {
        find: '@common',
        replacement: path.resolve(__dirname, '../lib/components/common/'),
      },
      {
        find: '@core/dist',
        replacement: path.resolve(__dirname, '../lib/components/core/dist'),
      },
    ],
  },
});
