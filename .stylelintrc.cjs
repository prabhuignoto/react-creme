/**
 * Root Stylelint config for SCSS Modules and design styles.
 */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': [
      // Enforce BEM-like naming and CSS Modules local class names
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__([a-z0-9]+(?:-[a-z0-9]+)*))?(?:--([a-z0-9]+(?:-[a-z0-9]+)*))?$',
      {
        resolveNestedSelectors: true,
        message:
          'Expected class selector to be BEM-like (block__element--modifier)',
      },
    ],
    'color-hex-length': 'short',
    'no-descending-specificity': null,
  },
  overrides: [
    {
      files: ['**/*.module.scss'],
      rules: {
        // Allow camelCase exported tokens but prefer kebab in class names
        'selector-class-pattern': [
          '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
          {
            resolveNestedSelectors: true,
          },
        ],
      },
    },
  ],
};
