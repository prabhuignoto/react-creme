/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
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
    environment: 'jsdom',
    globals: true,
    include: ['./components/**/*.test.tsx', './components/**/*.test.ts'],
    poolOptions: {
      threads: {
        maxThreads: 12,
        minThreads: 5,
      },
    },
    setupFiles: './test-setup.ts',
    silent: true,
    clearMocks: true,
    update: true,
    // Development config - same exclusions as CI for consistency
    coverage: {
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__tests__/**',
        '**/*.test.{ts,tsx}',
        '**/*-model.ts',
      ],
    },
  },
});
