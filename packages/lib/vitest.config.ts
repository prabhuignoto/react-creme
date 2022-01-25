/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      clean: true,
      enabled: true,
      reporter: ['html', 'lcov'],
      reportsDirectory: './coverage',
    },
    environment: 'jsdom',
    globals: true,
    include: ['./components/**/*.test.tsx'],
    maxThreads: 12,
    minThreads: 5,
    setupFiles: './jest-setup.ts',
    threads: true,
    update: true
  },
});
