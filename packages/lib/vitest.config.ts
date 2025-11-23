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
      all: true, // Include all files in the coverage report
      include: ['components/**/*.{ts,tsx}'], // Include specific files for coverage
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__tests__/**', // Exclude test files from coverage
        '**/*.test.{ts,tsx}',
        '**/*-model.ts', // Exclude type-only files
      ],
      reporter: ['html', 'lcov', 'clover', 'cobertura', 'json', 'text', 'junit'],
      reportsDirectory: './coverage',
      // Coverage thresholds - fail CI if not met
      thresholds: {
        branches: 70,
        functions: 75,
        lines: 80,
        statements: 80,
      },
      // Per-file thresholds for critical components
      perFile: false,
    },
    environment: 'jsdom',
    globals: true,
    include: ['./components/**/*.test.tsx', './components/**/*.test.ts'],
    poolOptions: {
      threads: {
        maxThreads: 20,
        minThreads: 10,
      },
    },
    setupFiles: './test-setup.ts',
    silent: true,
    clearMocks: true, // Automatically clear mocks between tests
    testTimeout: 10000, // Set a global timeout of 10 seconds for tests (reduced from 30s)
    update: true,
    watch: false,
  },
});
