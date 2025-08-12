import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssPresetEnv({ stage: 1 }),
        cssnano({ preset: 'default' }),
      ],
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      exportGlobals: true,
    },
    // Do not inject SCSS with additionalData to avoid placing @import before @use in modules
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'react-creme.ts'),
      name: 'ReactCreme',
      formats: ['es', 'cjs'],
      fileName: format => `react-creme.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'react-creme.[ext]',
        preserveModules: false,
        exports: 'named',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, './components'),
      '@design': resolve(__dirname, './design'),
      '@icons': resolve(__dirname, './icons'),
    },
  },
  optimizeDeps: {
    exclude: ['react', 'react-dom'],
  },
});
