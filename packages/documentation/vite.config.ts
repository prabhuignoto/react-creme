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
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    outDir: 'expo_dist',
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          'ui-core': ['../lib/components/index.ts'],
        },
        chunkFileNames: `chunks/[name]-[hash].js`,
        entryFileNames: `entries/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
    sourcemap: process.env.NODE_ENV === 'development',
    target: 'esnext',
    minify: 'esbuild',
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
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'hoist-non-react-statics',
    ],
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      format: 'esm',
    },
  },
  server: {
    cors: true,
  },
});
