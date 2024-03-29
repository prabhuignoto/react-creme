const path = require('path');

module.exports = {
  stories: [
    '../stories/**/Accordion.stories.tsx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        // {
        //   loader: 'postcss-loader',
        //   options: {
        //     postcssOptions: {
        //       plugins: [
        //         [
        //           'postcss-preset-env',
        //           {
        //             // Options
        //           },
        //         ],
        //       ],
        //     },
        //   },
        // },
        {
          loader: 'sass-loader',
          options: {
            // Prefer `dart-sass`
            implementation: require('sass'),
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@icons': path.resolve(__dirname, '../../lib/icons/index.ts'),
      '@design': path.resolve(__dirname, '../../lib/design'),
    };

    // Return the altered config
    return config;
  },
};
