import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  css: {
    postcss: {
      plugins: [
        (await import('postcss-import')).default(),
        (await import('postcss-preset-env')).default({ stage: 1 }),
        (await import('cssnano')).default({ preset: 'default' }),
      ],
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      exportGlobals: true,
    },
    // Avoid injecting global SCSS which can conflict with @use ordering in modules
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'react-creme.ts'),
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
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './components'),
      '@design': path.resolve(__dirname, './design'),
      '@icons': path.resolve(__dirname, './icons'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxDev: false,
  },
};
