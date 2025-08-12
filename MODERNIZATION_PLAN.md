# React Creme UI Library - 2025 Modernization Plan

## Executive Summary

This comprehensive plan outlines the modernization of the React Creme UI library from its current Webpack-based setup to cutting-edge 2025 standards while preserving CSS Modules functionality and maintaining backward compatibility.

## Current State Analysis

### Current Stack

- **Build Tool**: Webpack 5.88.2 with complex configuration
- **TypeScript**: v5.2.2 with moderate strictness
- **CSS**: SCSS with CSS Modules via webpack loaders
- **Testing**: Vitest setup (partially modern)
- **Monorepo**: Turbo with pnpm workspaces
- **Documentation**: Custom React app + Storybook package
- **React**: v19.1.0 (latest)

### Identified Issues

1. Slow build times due to Webpack overhead
2. Complex Webpack configuration requiring maintenance
3. Scattered testing infrastructure
4. No design token pipeline
5. Limited accessibility automation
6. Manual CSS Module type generation

---

## Phase 1: Build System Modernization (Week 1-2)

### 1.1 Migrate from Webpack to Vite

**Why Vite?**

- 10-100x faster HMR than Webpack
- Native ESM support
- Built-in CSS Modules support
- Simpler configuration

**Implementation:**

```javascript
// vite.config.ts for packages/lib
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['components/**/*.tsx', 'design/**/*.ts', 'icons/**/*.tsx'],
      outDir: 'dist',
      rollupTypes: true,
      staticImport: true,
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // Enable CSS Module composition
      exportGlobals: true,
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@design/theme.scss";`,
      },
    },
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
});
```

**Migration Steps:**

1. Install Vite dependencies
2. Create vite.config.ts
3. Update package.json scripts
4. Test build output
5. Remove Webpack configuration

### 1.2 Alternative: Rspack (Webpack-compatible)

If Webpack compatibility is crucial:

```javascript
// rspack.config.js
import { defineConfig } from '@rspack/cli';
import { CssExtractRspackPlugin } from '@rspack/core';

export default defineConfig({
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          CssExtractRspackPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CssExtractRspackPlugin({
      filename: 'react-creme.css',
    }),
  ],
  experiments: {
    css: true,
  },
});
```

---

## Phase 2: TypeScript Enhancement (Week 2)

### 2.1 Stricter TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",

    // Strict mode flags
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Additional checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,

    // Module resolution
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,

    // Output
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo",

    // CSS Modules
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
  }
}
```

### 2.2 CSS Module Type Generation

```bash
npm install -D typed-css-modules-vite-plugin
```

```javascript
// vite.config.ts addition
import typedCssModules from 'typed-css-modules-vite-plugin';

plugins: [
  typedCssModules({
    globalModulePaths: ['src/design/**/*.scss'],
  }),
];
```

---

## Phase 3: CSS Modules & Styling Enhancement (Week 2-3)

### 3.1 PostCSS Modern Configuration

```javascript
// postcss.config.mjs
import postcssPresetEnv from 'postcss-preset-env';
import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCascadeLayers from '@csstools/postcss-cascade-layers';

export default {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'logical-properties-and-values': true,
        'color-function': true,
        'container-queries': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    }),
    postcssNesting(),
    postcssCustomMedia(),
    postcssCascadeLayers(),
  ],
};
```

### 3.2 CSS Module Optimization

```scss
// design/css-modules-config.scss
// Shared CSS Module composition
@layer utilities {
  .focusRing {
    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  .srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}
```

---

## Phase 4: Design Token Pipeline (Week 3)

### 4.1 Style Dictionary Integration

```javascript
// style-dictionary.config.js
import StyleDictionary from 'style-dictionary';

export default {
  source: ['design/tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'design/generated/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'design/generated/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'design/generated/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    typescript: {
      transformGroup: 'js',
      buildPath: 'design/generated/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
};
```

### 4.2 Token Structure

```json
// design/tokens/colors.json
{
  "color": {
    "primary": {
      "50": { "value": "#eff6ff" },
      "500": { "value": "#3b82f6" },
      "900": { "value": "#1e3a8a" }
    },
    "semantic": {
      "error": { "value": "{color.red.500}" },
      "success": { "value": "{color.green.500}" }
    }
  }
}
```

---

## Phase 5: Component Development Environment (Week 3-4)

### 5.1 Modernize Storybook

```javascript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@chromatic-com/storybook',
    'storybook-addon-performance',
    'storybook-css-modules',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.ts',
      },
    },
  },
  features: {
    buildStoriesJson: true,
  },
  viteFinal: async (config) => {
    // Ensure CSS Modules work in Storybook
    config.css = {
      ...config.css,
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    };
    return config;
  },
};

export default config;
```

### 5.2 Alternative: Ladle (Lightweight)

```javascript
// .ladle/config.mjs
export default {
  stories: 'components/**/*.stories.{js,jsx,ts,tsx}',
  viteConfig: './vite.config.ts',
  addons: {
    a11y: {
      enabled: true,
    },
    msw: {
      enabled: true,
    },
    width: {
      enabled: true,
      options: {
        xsmall: 414,
        small: 640,
        medium: 768,
        large: 1024,
      },
    },
  },
  hotkeys: {
    search: ['meta', 'k'],
    nextStory: ['meta', 'shift', 'ArrowRight'],
  },
};
```

---

## Phase 6: Testing Infrastructure (Week 4)

### 6.1 Vitest Configuration

```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'test-setup.ts',
        '**/*.stories.tsx',
        '**/*.test.tsx',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    benchmark: {
      include: ['**/*.bench.ts'],
    },
  },
});
```

### 6.2 Visual Regression Testing

```javascript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './visual-tests',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  use: {
    baseURL: 'http://localhost:6006',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run storybook',
    port: 6006,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
```

---

## Phase 7: Accessibility Automation (Week 5)

### 7.1 Automated A11y Testing

```javascript
// test-setup.ts
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Global a11y test helper
export async function testA11y(container: HTMLElement) {
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
      'valid-lang': { enabled: true },
      'aria-valid-attr': { enabled: true },
    },
  });
  expect(results).toHaveNoViolations();
}
```

### 7.2 Component A11y Wrapper

```typescript
// components/common/a11y-wrapper.tsx
import { useEffect } from 'react';
import axe from '@axe-core/react';

export function A11yWrapper({ children, enabled = true }) {
  useEffect(() => {
    if (enabled && process.env.NODE_ENV !== 'production') {
      axe(React, ReactDOM, 1000);
    }
  }, [enabled]);

  return <>{children}</>;
}
```

---

## Phase 8: Performance Optimization (Week 5-6)

### 8.1 Bundle Optimization

```javascript
// vite.config.ts additions
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'utils': ['classnames', 'nanoid', 'use-debounce'],
      },
      // CSS code splitting per component
      assetFileNames: (assetInfo) => {
        if (assetInfo.name?.endsWith('.css')) {
          return 'styles/[name]-[hash][extname]';
        }
        return 'assets/[name]-[hash][extname]';
      },
    },
  },
  // Tree-shaking optimizations
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
}
```

### 8.2 Lazy Loading Pattern

```typescript
// components/index.ts
// Export lazy-loaded components
export const Button = lazy(() => import('./button/button'));
export const Card = lazy(() => import('./card/card'));

// Provide sync exports for SSR
export { Button as ButtonSync } from './button/button';
export { Card as CardSync } from './card/card';
```

---

## Phase 9: Developer Experience (Week 6)

### 9.1 ESLint Flat Config (2025 Standard)

```javascript
// eslint.config.mjs
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import cssModules from 'eslint-plugin-css-modules';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': a11y,
      'css-modules': cssModules,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'error',
      'css-modules/no-unused-class': 'warn',
    },
  },
];
```

### 9.2 Pre-commit Hooks

```javascript
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Type check
npm run typecheck

# Lint staged files
npx lint-staged
```

```json
// .lintstagedrc.json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write", "vitest related --run"],
  "*.{scss,css}": ["stylelint --fix", "prettier --write"],
  "*.module.scss": ["typed-css-modules --pattern"]
}
```

### 9.3 GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Size Check
        uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4

      - run: pnpm install --frozen-lockfile
      - run: pnpm build-storybook

      - name: Visual Tests
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

---

## Phase 10: Migration Strategy (Week 7-8)

### 10.1 Phased Component Migration

```bash
# Step 1: Create migration branch
git checkout -b feat/modernization-2025

# Step 2: Migrate build system first
npm uninstall webpack webpack-cli webpack-bundle-analyzer
npm install -D vite @vitejs/plugin-react-swc vite-plugin-dts

# Step 3: Update scripts
npm pkg set scripts.build="vite build"
npm pkg set scripts.dev="vite"

# Step 4: Test each component individually
npm run test -- --run components/button
```

### 10.2 Backward Compatibility Layer

```typescript
// compat/webpack-module-federation.ts
// Maintain webpack module federation compatibility
export function createCompatibilityWrapper(Component: React.FC) {
  return {
    default: Component,
    __esModule: true,
    // Support for legacy CSS Module imports
    styles: Component.styles || {},
  };
}
```

### 10.3 Versioning Strategy

```json
// package.json
{
  "version": "1.0.0",
  "exports": {
    ".": {
      "import": "./dist/react-creme.mjs",
      "require": "./dist/react-creme.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": {
      "import": "./dist/react-creme.css",
      "require": "./dist/react-creme.css"
    },
    "./components/*": {
      "import": "./dist/components/*.mjs",
      "require": "./dist/components/*.cjs",
      "types": "./dist/components/*.d.ts"
    }
  },
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    }
  }
}
```

---

## Phase 11: Documentation & Release (Week 8)

### 11.1 Automated Changelog

```javascript
// .changelogrc.js
module.exports = {
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'perf', section: 'Performance' },
    { type: 'breaking', section: 'BREAKING CHANGES' },
  ],
};
```

### 11.2 Release Automation

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4

      - run: pnpm install
      - run: pnpm build

      - name: Release
        uses: changesets/action@v1
        with:
          publish: pnpm release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Performance Metrics & Goals

### Build Performance Targets

- **Cold build**: < 10s (currently ~45s with Webpack)
- **HMR update**: < 100ms (currently ~2s)
- **Type checking**: < 5s (incremental)

### Bundle Size Targets

- **Core bundle**: < 50KB gzipped
- **Per-component**: < 5KB gzipped
- **CSS**: < 20KB gzipped total

### Runtime Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: > 95

---

## Risk Mitigation

### Potential Issues & Solutions

1. **CSS Module compatibility**
   - Solution: Use vite-plugin-lib-inject-css for proper CSS injection
   - Fallback: Maintain dual build with both Vite and Webpack

2. **Breaking changes in dependencies**
   - Solution: Lock versions during migration
   - Use canary releases for testing

3. **Monorepo complexity**
   - Solution: Migrate packages independently
   - Use Turborepo's dependency graph

4. **Type generation issues**
   - Solution: Use multiple type generators as fallback
   - Manual type files as last resort

---

## Timeline Summary

- **Week 1-2**: Build system migration (Webpack → Vite)
- **Week 2**: TypeScript strictness upgrade
- **Week 2-3**: CSS Modules optimization
- **Week 3**: Design token pipeline
- **Week 3-4**: Storybook/Documentation upgrade
- **Week 4**: Testing infrastructure
- **Week 5**: Accessibility automation
- **Week 5-6**: Performance optimization
- **Week 6**: Developer experience improvements
- **Week 7-8**: Migration execution & testing
- **Week 8**: Documentation & release

Total estimated time: **8 weeks** for complete modernization

---

## Success Criteria

✅ All components build with Vite  
✅ 90%+ test coverage maintained  
✅ Build time reduced by 75%  
✅ Zero breaking changes for consumers  
✅ Full CSS Modules support retained  
✅ Accessibility score > 95  
✅ Bundle size reduced by 30%  
✅ TypeScript strict mode enabled  
✅ Design tokens integrated  
✅ CI/CD pipeline < 5 minutes

---

## Next Steps

1. **Review & Approve Plan**: Get stakeholder buy-in
2. **Create Feature Branch**: `feat/modernization-2025`
3. **Set Up Tracking**: Create GitHub project board
4. **Begin Phase 1**: Start with Vite migration
5. **Weekly Progress Reviews**: Track against timeline

---

## Resources & References

- [Vite Documentation](https://vitejs.dev/)
- [Rspack Documentation](https://rspack.dev/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Storybook 8.0](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [CSS Modules Specification](https://github.com/css-modules/css-modules)
- [TypeScript 5.5 Handbook](https://www.typescriptlang.org/docs/)
