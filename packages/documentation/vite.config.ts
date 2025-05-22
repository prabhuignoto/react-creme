import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import PostCSSImport from 'postcss-import';
import PostCSSPresetEnv from 'postcss-preset-env';
import PostCSSReporter from 'postcss-reporter';
import PostSCSS from 'postcss-scss';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// Vite 5+ recommends ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  css: {
    postcss: {
      parser: PostSCSS,
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
      '@design': resolve(__dirname, '../lib/design'),
      '@icons': resolve(__dirname, '../lib/icons'),
      '@lib': resolve(__dirname, '../lib/components/index.ts'),
    },
  },
});
