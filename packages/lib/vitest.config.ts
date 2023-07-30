/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@design': path.resolve(__dirname, './design'),
      '@icons': path.resolve(__dirname, './icons'),
    },
  },
  test: {
    coverage: {
      clean: true,
      enabled: true,
      reporter: ['html', 'lcov', 'clover', 'cobertura'],
      reportsDirectory: './coverage',
    },
    environment: 'jsdom',
    globals: true,
    include: ['./components/**/*.test.tsx', './components/**/*.test.ts'],
    maxThreads: 20,
    minThreads: 10,
    setupFiles: './test-setup.ts',
    silent: true,
    threads: true,
    update: true,
    watch: false,
  },
});
