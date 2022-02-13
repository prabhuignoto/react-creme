/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./components/**/*.test.tsx'],
    maxThreads: 12,
    minThreads: 5,
    setupFiles: './test-setup.ts',
    threads: true,
    update: true,
  },
});
