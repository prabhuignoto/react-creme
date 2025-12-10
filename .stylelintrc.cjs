/**
 * Root Stylelint config for SCSS Modules and design styles.
 */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended',
    'stylelint-config-prettier', // Must be last to override formatting rules
  ],
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
    {
      // Design system files may need deeper nesting for mixins/utilities
      files: ['**/design/**/*.scss'],
      rules: {
        'max-nesting-depth': [
          5,
          {
            ignore: ['pseudo-classes'],
            ignoreAtRules: [
              'each',
              'for',
              'if',
              'include',
              'mixin',
              'function',
            ],
          },
        ],
      },
    },
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    // Color and alpha notation rules
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'color-hex-length': 'short',
    // Reduce need for stylelint-disable comments by allowing reasonable nesting
    'max-nesting-depth': [
      4,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['each', 'for', 'if', 'include', 'mixin', 'function'],
      },
    ],
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
    // SCSS-specific rules from deleted configs
    'scss/at-import-partial-extension': null,
    'scss/dollar-variable-pattern': null,
    'scss/double-slash-comment-empty-line-before': null,
    // Allow .scss extensions in @use statements (modern Sass syntax)
    'scss/load-partial-extension': null,
    'scss/no-global-function-names': null,
    // Selector patterns - allow flexibility for IDs and pseudo-elements
    'selector-class-pattern': [
      // Enforce BEM-like naming and CSS Modules local class names
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__([a-z0-9]+(?:-[a-z0-9]+)*))?(?:--([a-z0-9]+(?:-[a-z0-9]+)*))?$',
      {
        message:
          'Expected class selector to be BEM-like (block__element--modifier)',
        resolveNestedSelectors: true,
      },
    ],
    'selector-id-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': null,
  },
};
