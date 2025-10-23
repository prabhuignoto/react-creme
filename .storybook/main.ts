import type { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';

const config: StorybookConfig = {
  stories: ['../packages/storybook/stories/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-links',
  ],
  docs: {
    autodocs: true,
  },
  features: {
    experimentalRSC: false,
  },
  typescript: {
    // Speed up HMR, rely on tsc/vitest in packages for type checks
    check: false,
  },
  viteFinal: async config => {
    // Prefer faster HMR, better dependency pre-bundling, and aggressive treeshaking for build
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@design': join(__dirname, '../packages/lib/design'),
          '@icons': join(__dirname, '../packages/lib/icons'),
          '@lib': join(__dirname, '../packages/lib/components'),
        },
      },
      css: {
        ...config.css,
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['mixed-decls'],
          },
        },
        modules: {
          ...(config.css as any)?.modules,
          localsConvention: 'camelCase',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
          exportGlobals: true,
        },
      },
      esbuild: {
        ...config.esbuild,
        treeShaking: true,
      },
      build: {
        ...config.build,
        cssCodeSplit: true,
        rollupOptions: {
          ...config.build?.rollupOptions,
          treeshake: true,
          output: {
            ...config.build?.rollupOptions?.output,
            // Code-split vendor to improve caching
            manualChunks: {
              vendor: ['react', 'react-dom'],
            },
          },
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: ['react', 'react-dom'],
      },
    } as typeof config;
  },
};

export default config;
