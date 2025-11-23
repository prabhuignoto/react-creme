# Monorepo Tooling Guide

## Overview

This document explains how the modern tooling works across the react-creme Turborepo monorepo.

## Tooling Architecture

### Root-Level vs Package-Level Commands

The monorepo uses a hybrid approach:

1. **Root-level coordination** via Turbo
2. **Package-level execution** for actual linting/checking

## How Commands Work

### Linting Workflow

```bash
pnpm lint
```

**What happens:**
1. Turbo runs `oxlint` task across all packages (fast pre-check)
2. Turbo then runs `lint` task across all packages (full ESLint)
3. Each package has its own `oxlint` script that runs locally
4. Turbo orchestrates and caches results

**Monorepo flow:**
```
Root: turbo run oxlint
  ├─> packages/lib: oxlint .
  ├─> packages/documentation: oxlint .
  └─> packages/storybook: oxlint .

Then:
Root: turbo run lint
  ├─> packages/lib: eslint + stylelint
  ├─> packages/documentation: eslint + stylelint
  └─> packages/storybook: (builds first)
```

### Oxlint (Fast Linting)

**Root command:**
```bash
pnpm oxlint
```

**What it does:**
- Runs oxlint on entire monorepo from root
- Uses `.oxlintrc.json` configuration
- 50-100x faster than ESLint
- Used in pre-commit hooks for instant feedback

**Turbo orchestration:**
```bash
turbo run oxlint
```
- Runs `oxlint` script in each package
- Parallelized across packages
- Results are cached

### Knip (Unused Code Detection)

**Root command:**
```bash
pnpm knip              # Check all packages
pnpm knip:production   # Production deps only
```

**What it does:**
- Analyzes entire monorepo structure
- Uses `.knip.json` with workspace configuration
- Finds unused:
  - Files
  - Exports
  - Dependencies
  - Dev dependencies

**Monorepo configuration:**
- Configured in `.knip.json` with workspace awareness
- Understands Turbo dependency graph
- Ignores appropriate files per package

### Pre-commit Hooks

**Located:** `.husky/pre-commit`

**Workflow:**
1. `pnpm oxlint` - Fast check on entire repo (from root)
2. `npx lint-staged` - Runs on staged files only:
   - Prettier formatting
   - ESLint fixing
   - Stylelint fixing

**Why this order?**
- Oxlint catches obvious issues in <1 second
- Lint-staged does thorough fixing on changed files
- Prevents slow commits while maintaining quality

## Package-Specific Commands

Each package has these scripts:

### packages/lib
```json
{
  "oxlint": "oxlint .",
  "eslint": "eslint ./components/**/*.{tsx,ts}",
  "lint": "pnpm eslint && pnpm lint:css && pnpm prettier:check",
  "lint:css": "stylelint ./components/**/*.scss ./design/**/*.scss"
}
```

### packages/documentation
```json
{
  "oxlint": "oxlint .",
  "lint": "eslint \"components/**/*.{js,jsx,ts,tsx}\" && pnpm run lint:css && pnpm run prettier:check",
  "lint:css": "stylelint ./components/**/*.scss"
}
```

### packages/storybook
```json
{
  "oxlint": "oxlint ."
}
```

## Turbo Task Configuration

Located in `turbo.json`:

```json
{
  "oxlint": {
    "cache": true,      // Results are cached
    "outputs": []       // No file outputs
  },
  "lint": {
    "dependsOn": ["^build"],  // Needs dependencies built first
    "outputs": []
  },
  "knip": {
    "cache": false,     // Always runs (checks for changes)
    "outputs": []
  }
}
```

## Running Commands

### From Root (Recommended)

```bash
# Run across all packages (turbo orchestrates)
pnpm lint          # oxlint + full lint
pnpm oxlint        # Fast check only
pnpm knip          # Check unused code
pnpm format        # Format all packages
pnpm test          # Test all packages

# Run with filters
pnpm lint --filter=react-creme        # Lib only
pnpm lint --filter=*docu*             # Documentation only
```

### From Package Directory

```bash
cd packages/lib
pnpm oxlint        # Run oxlint on lib only
pnpm lint          # Run full lint on lib only
pnpm eslint        # Run ESLint only
```

## CI/CD Integration

In `.github/workflows/CI.yml`:

```yaml
# Build job includes linting
- run: pnpm lint  # Runs oxlint + ESLint via Turbo

# Can also run individually
- run: pnpm oxlint
- run: pnpm knip
```

Turbo caching works in CI:
- Lint results are cached
- Only changed packages are re-linted
- Faster CI times

## Performance Benefits

### Oxlint
- **50-100x faster** than ESLint
- Catches 70%+ of issues instantly
- Perfect for pre-commit hooks
- Parallelized across CPU cores

### Turbo Orchestration
- **Parallel execution** across packages
- **Smart caching** of results
- **Dependency-aware** task running
- **Incremental** - only runs what changed

### Example Performance

```bash
# Without oxlint (ESLint only)
pnpm lint → ~15-20 seconds

# With oxlint first
pnpm oxlint → 0.5 seconds ✓
pnpm lint → ~15 seconds (if oxlint passes)

# With Turbo caching (no changes)
pnpm lint → <1 second (cache hit)
```

## Troubleshooting

### "oxlint: command not found"

**Solution:**
```bash
pnpm install  # Install dependencies
```

### "Turbo didn't find oxlint task"

**Check:**
1. Package has `oxlint` script in `package.json`
2. `turbo.json` has `oxlint` task defined
3. Run `pnpm install` after adding new packages

### Lint-staged not running

**Check:**
1. Husky is installed: `pnpm prepare`
2. Pre-commit hook is executable: `chmod +x .husky/pre-commit`
3. You're in a git repository

### Knip reports false positives

**Solution:**
- Add to `ignoreDependencies` in `.knip.json`
- Add to `ignore` patterns
- Check workspace configuration

## Best Practices

1. **Always use root commands** for consistency
2. **Let Turbo orchestrate** - don't bypass it
3. **Trust the cache** - Turbo knows when to invalidate
4. **Run `pnpm oxlint`** before committing manually
5. **Use `pnpm knip`** periodically to clean up
6. **Filter for focused work**: `--filter=package-name`

## Adding New Packages

When adding a new package:

1. Add `oxlint` script to package.json:
   ```json
   {
     "scripts": {
       "oxlint": "oxlint .",
       "lint": "..."
     }
   }
   ```

2. Add workspace to `.knip.json`:
   ```json
   {
     "workspaces": {
       "packages/new-package": {
         "entry": ["..."],
         "project": ["..."]
       }
     }
   }
   ```

3. Test:
   ```bash
   pnpm oxlint --filter=new-package
   pnpm lint --filter=new-package
   ```

## Summary

✅ **Monorepo-aware**: All tools understand workspace structure
✅ **Turbo-orchestrated**: Parallel execution with caching
✅ **Fast feedback**: Oxlint pre-checks in <1 second
✅ **Comprehensive**: Full ESLint + Stylelint coverage
✅ **CI-optimized**: Caching works in GitHub Actions
✅ **Pre-commit**: Quality gates before commit
