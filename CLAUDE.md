# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Creme is a modern UI toolkit for React featuring 55+ high-quality, accessible, and themeable components. The project is built as a Turborepo monorepo with pnpm workspaces, containing a component library, documentation site, and Storybook for component development.

### Modern Tooling (2025)

This project uses cutting-edge tooling and configurations:

- **Build**: Vite 6.3.5 with LightningCSS for CSS optimization
- **Linting**: ESLint 9+ flat config + Oxlint (50-100x faster)
- **Testing**: Vitest 3.1.4 with jsdom
- **TypeScript**: 5.9.3 with strict mode and modern compiler options
- **Package Manager**: pnpm 10.14.0
- **Monorepo**: Turborepo 2.5.8
- **Code Quality**: Knip for unused code detection
- **CI/CD**: GitHub Actions with pnpm caching
- **Node**: v20.18.1 LTS (see `.nvmrc`)

## Repository Structure

```
react-creme/
├── packages/
│   ├── lib/              # Main component library (react-creme npm package)
│   ├── documentation/    # Documentation website (Vite-based)
│   └── storybook/        # Storybook component development environment
└── .storybook/           # Shared Storybook configuration
```

### Component Library (`packages/lib/`)

- **Components**: Each component lives in `components/<component-name>/` with its TypeScript implementation, SCSS module, and tests
- **Design System**: Global styles, tokens, and mixins are in `design/` (theme.scss, tokens.scss, effects.scss, etc.)
- **Entry Point**: `react-creme.ts` exports all public components and types
- **Build System**: Uses Vite (migrated from Webpack) with CSS Modules support

## ⚠️ Important: Monorepo Tooling

This is a **Turborepo monorepo**. All modern tooling (oxlint, knip, ESLint) is **monorepo-aware** and works across all packages.

**See `MONOREPO_TOOLING.md` for detailed architecture and workflow.**

### First Time Setup

```bash
# Install all dependencies (including oxlint, knip, lightningcss)
pnpm install

# Verify installation
pnpm oxlint --version
pnpm knip --version
```

## Common Development Commands

### Building

```bash
# Build everything (library, docs, storybook)
pnpm build

# Build only the library
pnpm build:lib
# OR from packages/lib:
pnpm build

# Build documentation
pnpm build:doc

# Build Storybook
pnpm build-story
```

### Development

```bash
# Run documentation dev server
pnpm dev

# Run Storybook dev server
pnpm story

# Run library in dev mode (from packages/lib)
cd packages/lib && pnpm dev
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in CI mode (from packages/lib)
cd packages/lib && pnpm test:ci

# Run tests with UI (from packages/lib)
cd packages/lib && pnpm test-ui

# Run a single component test (from packages/lib)
cd packages/lib && vitest --run components/button
```

### Linting & Formatting (Monorepo-Wide)

```bash
# Run all linters across all packages (oxlint → ESLint)
pnpm lint

# Run fast linting only (oxlint) - <1 second!
pnpm oxlint

# Format all packages
pnpm format

# Fix JavaScript/TypeScript across all packages
pnpm fix-js

# Fix CSS/SCSS across all packages
pnpm fix-css

# Fix everything
pnpm fix-all

# Run full quality check
pnpm clean

# Check for unused code/dependencies (monorepo-aware)
pnpm knip
pnpm knip:production  # Production dependencies only

# Run with Turbo filters (specific packages)
pnpm lint --filter=react-creme        # Lib only
pnpm lint --filter=*docu*             # Documentation only
pnpm oxlint --filter=react-creme      # Fast lint lib only
```

**How it works:**

- Turbo orchestrates tasks across packages in parallel
- Oxlint runs first (50-100x faster) as a pre-check
- ESLint runs after for comprehensive checking
- Results are cached for faster subsequent runs
- See `MONOREPO_TOOLING.md` for architecture details

### Running Single Package Commands

Since this is a Turborepo monorepo, you can run commands in specific packages:

```bash
# From root, using turbo filters
turbo run build --filter=react-creme        # library only
turbo run dev --filter=*docu*               # documentation only
turbo run dev --filter=*story*              # storybook only

# Or navigate to the package
cd packages/lib && pnpm build
cd packages/documentation && pnpm dev
cd packages/storybook && pnpm dev
```

## Architecture & Key Patterns

### Component Structure

Each component follows a consistent pattern:

```
components/<component-name>/
├── <component-name>.tsx           # Main component implementation
├── <component-name>-model.ts      # TypeScript types/interfaces
├── <component-name>.module.scss   # Component styles (CSS Modules)
└── __tests__/
    └── <component-name>.test.tsx  # Vitest tests
```

### CSS Modules

- **Naming Convention**: `[name]__[local]___[hash:base64:5]`
- **Import Pattern**: `import styles from './component.module.scss'`
- **Usage**: Classes are camelCased in TypeScript (e.g., `styles.buttonWrapper`)
- **Global Styles**: Design tokens and utilities are in `packages/lib/design/`

### Theme System

Components support theming through the `ThemeProvider`:

- Theme colors, sizes, and design tokens are defined in `design/theme.scss` and `design/tokens.scss`
- Components use `isDark()` utility to detect dark mode
- Custom theme properties can be passed via ThemeProvider

### State Management

- Components use React 19 features and hooks
- No external state management library in the component library
- Documentation site uses Jotai for state management

### Accessibility

- All components should be accessible and keyboard navigable
- Tests should include accessibility checks using `jest-axe`
- Storybook includes `@storybook/addon-a11y` for visual a11y testing

## Build System Details

### Vite Configuration (Library)

The library (`packages/lib`) uses Vite with:

- **Entry Point**: `react-creme.ts`
- **Output Formats**: ESM (`.mjs`) and CJS (`.cjs`)
- **CSS**: Single bundled CSS file (`react-creme.css`) with CSS Modules
- **Type Declarations**: Generated via `tsc` with `tsconfig.emit.json`
- **Path Aliases**:
  - `@components` → `./components`
  - `@design` → `./design`
  - `@icons` → `./icons`

### Package Exports

The library exports:

- `"."` → Main entry (types, ESM, CJS)
- `"./css"` → Bundled CSS file
- Tree-shakeable with `sideEffects: false`

### Modernization Status

The project is currently undergoing modernization (see `MODERNIZATION_PLAN.md`):

- ✅ Migrated from Webpack to Vite for library builds
- ✅ Using Vitest for testing
- ✅ Storybook 8.x with Vite builder
- ✅ React 19 support
- 🚧 Ongoing: Further build optimizations and tooling updates

## Testing Guidelines

### Test Setup

- **Framework**: Vitest with `jsdom` environment
- **Testing Library**: `@testing-library/react` for component testing
- **User Events**: `@testing-library/user-event`
- **Accessibility**: `jest-axe` for a11y testing
- **Setup File**: `packages/lib/test-setup.ts`

### Writing Tests

Tests are located in `__tests__/` directories within each component folder:

```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Running Specific Tests

```bash
# From packages/lib
vitest --run components/button  # Run button tests only
vitest --ui                      # Run with UI dashboard
vitest --coverage               # Run with coverage report
```

## Code Style & Standards

### ESLint Configuration (Flat Config - 2025)

- **Config File**: `eslint.config.mjs` (modern flat config format)
- **Fast Linting**: Oxlint runs first in pre-commit hooks (50-100x faster)
- **IDE Support**: Full TypeScript-aware linting
- **Note**: The old `.eslintrc.js` has been removed (deprecated in ESLint v10)

### TypeScript (Strict Mode + Modern Options)

- **Version**: 5.9.3 across all packages
- **Target**: ES2022 with modern browser support
- **Strict mode enabled** with additional safety:
  - `exactOptionalPropertyTypes: true`
  - `noUncheckedIndexedAccess: true`
  - `noPropertyAccessFromIndexSignature: true`
  - `verbatimModuleSyntax: true` (replaces importsNotUsedAsValues)
  - `incremental: true` for faster builds
- All components are typed with explicit props interfaces in `-model.ts` files
- Use `React.forwardRef` for components that need ref forwarding
- Export types alongside components in `react-creme.ts`

### React Patterns

- Functional components with hooks (no class components)
- Use React 19 features (latest version)
- Forward refs when components wrap native elements
- Memoization with `React.memo`, `useMemo`, `useCallback` where appropriate

### SCSS/CSS

- Use CSS Modules (`.module.scss`) for component-specific styles
- Import design tokens from `@design` for consistency
- Follow BEM-like naming within modules
- Use Stylelint rules defined in root config

#### Sass Best Practices (Mixed Declarations)

**CRITICAL**: Modern Sass (1.77.7+) enforces CSS-compliant ordering within selectors to match the CSS specification. Always follow this order:

1. **Variable declarations** (`$var: value;`)
2. **@extend directives** (`@extend %placeholder;`)
3. **Regular CSS properties** (`color: red; margin: 0;`)
4. **Nested rules** (`& {}`, `&.class {}`, `&:hover {}`)
5. **@include directives that generate nested rules** (e.g., `@include animate.set-keyframes(...)`)

**Example:**

```scss
.component {
  // 1. Variables first
  $settings: (
    from: (
      ...,
    ),
    to: (
      ...,
    ),
  );

  // 2. Extends next
  @extend %border-radius;

  // 3. Properties before any nested rules
  display: block;
  color: theme.$primary;
  padding: 1rem;

  // 4. Nested selectors
  &:hover {
    opacity: 0.8;
  }

  // 5. Animation mixins last (they generate @keyframes)
  @include animate.set-settings(0.25s);
  @include animate.set-keyframes('fade-in', $settings);
}
```

**Why?** Sass 1.92.0+ enforces CSS-compliant ordering where declarations must appear before nested rules. Violating this causes deprecation warnings and will break in future versions.

**Configuration:** The project uses Vite with `api: 'modern-compiler'` for modern Sass behavior. All code follows proper CSS/Sass ordering (declarations before nested rules).

### Linting

- ESLint configuration is in root `package.json` (lint-staged section)
- Prettier for code formatting
- Husky pre-commit hook runs `pretty-quick --staged`
- Components should pass all linting before commits

## Package Management

- **Package Manager**: pnpm (version 10.14.0)
- **Workspace Protocol**: Uses pnpm workspaces
- **Installing Dependencies**: Always use `pnpm add` (not npm or yarn)
- **Updating Dependencies**: Run from root to update all workspaces

## Git Workflow

### Pre-commit Hooks (Enhanced 2025)

Husky is configured with a modern pre-commit workflow:

1. **Oxlint** runs first (50-100x faster than ESLint) for quick feedback
2. **lint-staged** then runs comprehensive checks:
   - TypeScript/JavaScript: Prettier → ESLint
   - SCSS/CSS: Prettier → Stylelint
   - JSON/Markdown/YAML: Prettier

**Note**: No manual `git add` needed (lint-staged handles it automatically)

## Dependencies to Know

### Core Dependencies

- **react** & **react-dom**: v19.1.0 (peer dependencies)
- **classnames**: Utility for conditional CSS classes
- **nanoid**: Unique ID generation
- **use-debounce**: Debouncing hooks
- **hex-rgb**: Color utilities
- **fast-deep-equal**: Deep equality checks

### Build Tools (2025)

- **vite**: v6.3.5 - Modern build tool with HMR
- **lightningcss**: CSS optimization (faster than cssnano)
- **esbuild**: JavaScript minification (faster than terser)
- **turbo**: v2.5.8 - Monorepo task orchestration
- **typescript**: v5.9.3 - Latest with modern strict options
- **vitest**: v3.1.4 - Test runner
- **@vitejs/plugin-react**: Vite React plugin

### Code Quality Tools (New in 2025)

- **oxlint**: v1.0+ - Rust-based ultra-fast linter
- **knip**: Unused code/dependency detection
- **eslint**: v9+ with flat config format

## Debugging Tips

### Build Issues

If builds fail:

1. Clear node_modules: `rm -rf node_modules && pnpm install`
2. Clear Turbo cache: `rm -rf .turbo`
3. Clear Vite cache: `rm -rf packages/lib/node_modules/.vite`
4. Clear TypeScript build cache: `find . -name ".tsbuildinfo" -delete`
5. Ensure correct Node version: `nvm use` (reads from `.nvmrc`)

### Linting Issues

If ESLint shows errors after upgrade:

1. The project now uses ESLint flat config (`eslint.config.mjs`)
2. Make sure you're using ESLint v9+
3. Run `pnpm oxlint` first for fast feedback
4. Check that your IDE ESLint extension supports flat config

### CSS Module Type Issues

CSS Module types are auto-generated by `typescript-plugin-css-modules`. If types are missing:

1. Ensure `typescript-plugin-css-modules` is in devDependencies
2. Check `tsconfig.json` includes the plugin
3. Restart TypeScript server in your editor

### Test Failures

- Ensure you're in the correct package directory
- Check that `test-setup.ts` is properly loaded
- Use `--ui` flag for interactive debugging
- Check coverage with `--coverage` flag

## Important Files

### Configuration Files (2025)

- **eslint.config.mjs**: ESLint flat config (modern format)
- **.oxlintrc.json**: Oxlint configuration for fast linting
- **.knip.json**: Knip configuration with workspace awareness for monorepo
- **.nvmrc**: Node.js version specification (20.18.1)
- **.browserslistrc**: Browser targets for 2025
- **turbo.json**: Turborepo task pipeline (includes oxlint, knip tasks)
- **MONOREPO_TOOLING.md**: Detailed guide on how tooling works across packages
- **packages/lib/vite.config.ts**: Library build with LightningCSS
- **packages/lib/vitest.config.ts**: Test configuration for CI
- **packages/lib/vitest.config.dev.ts**: Test configuration for development
- **.storybook/main.ts**: Storybook configuration
- **packages/lib/react-creme.ts**: Library entry point with all exports
- **packages/lib/design/**: Global design system tokens and utilities

### Deprecated/Removed Files

- ~~`.eslintrc.js`~~ → Replaced with `eslint.config.mjs` (flat config)
- ~~`webpack.config.mjs`~~ → Removed (project uses Vite)
- ~~`tsconfig.webpack.json`~~ → Removed (no longer needed)

## Contribution Guidelines

When adding or modifying components:

1. **UX Review**: Use the [UX Review Checklist](packages/lib/design/UX_REVIEW_CHECKLIST.md) for comprehensive audits or [Quick Checklist](packages/lib/design/UX_QUICK_CHECKLIST.md) for rapid reviews
2. **Component Implementation**: Create/modify in `components/<name>/`
3. **Export**: Add exports to `react-creme.ts`
4. **Styles**: Use CSS Modules with design tokens from `@design`
5. **Types**: Define in `<component>-model.ts` and export in main file
6. **Tests**: Add comprehensive tests in `__tests__/` (including `jest-axe` for accessibility)
7. **Storybook**: Add stories in `packages/storybook/stories/`
8. **Lint & Format**: Run `pnpm clean` before committing
9. **Documentation**: Update documentation site if needed

### UX Quality Standards

All components must meet these minimum requirements:

- ✅ **WCAG 2.1 Level AA** compliance (use `jest-axe` in tests)
- ✅ **Full keyboard accessibility** (Tab, Enter, Arrows, Escape, etc.)
- ✅ **Design tokens** instead of hardcoded values
- ✅ **Touch-friendly** targets (≥ 44×44px)
- ✅ **All interactive states** (hover, focus, active, disabled)
- ✅ **Dark mode** support

See [Design System documentation](packages/lib/design/DESIGN_SYSTEM.md) for detailed guidelines.

## Performance Considerations

- **Bundle Size**: ~118KB gzipped (full library with all 58+ components and CSS). Individual components with tree-shaking: ~12-20KB gzipped
- Tree-shaking is enabled (`sideEffects: false`) - import only what you need
- CSS is bundled as a single file (~28KB gzipped) to reduce HTTP requests
- Terser minification with console/debugger removal in production
- Component lazy-loading is supported by consumers
- Run `pnpm size` in `packages/lib/` to measure bundle size with size-limit
