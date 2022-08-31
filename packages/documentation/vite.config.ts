import react from '@vitejs/plugin-react';
import path from 'path';
import PostCSSImport from 'postcss-import';
import PostCSSPresetEnv from 'postcss-preset-env';
import PostCSSReporter from 'postcss-reporter';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const generateHash = () => Math.floor(Math.random() * 90000) + 10000;

const hash = generateHash();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'expo_dist',
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        chunkFileNames: `[name]${hash}.js`,
      },
    },
    sourcemap: true,
  },
  clearScreen: true,
  css: {
    postcss: {
      plugins: [PostCSSImport(), PostCSSPresetEnv(), PostCSSReporter()],
    },
  },
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
      '@lib': path.resolve(__dirname, '../lib/components/index.ts'),
    },
  },
});
