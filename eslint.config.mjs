import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Base ESLint recommended config
  js.configs.recommended,

  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/expo_dist/**',
      '**/storybook-static/**',
      '**/.jest-cache/**',
      '**/*.d.ts',
      '**/images/**',
      '**/icons/**',
      '**/*.css',
      '**/*.html',
      '**/*.json',
      '**/*.svg',
      '**/*.ico',
    ],
  },

  // Main configuration for TypeScript and React files
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      jest: jest,
      'jsx-a11y': jsxA11y,
      react: react,
      'react-hooks': reactHooks,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      // Merge ESLint recommended, TypeScript, and custom rules
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.configs.recommended.rules,

      // Custom rules (alphabetically sorted)
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/default': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off', // TypeScript handles this
      // Downgrade jsx-a11y rules to warnings - accessibility best practices but not blocking
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/mouse-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'jsx-a11y/no-redundant-roles': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'react/no-children-prop': 'warn',
      'react/prop-types': 'off', // Using TypeScript for type checking
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'sort-keys-fix/sort-keys-fix': 'error',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
      react: {
        version: 'detect',
      },
    },
  },

  // Test files specific configuration
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        afterAll: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        test: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'jest/expect-expect': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/valid-expect': 'error',
    },
  },

  // Prettier config must be last to override other formatting rules
  prettier,
];
