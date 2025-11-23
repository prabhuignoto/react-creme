/* Root PostCSS config for all packages */
const plugins = [
  require('postcss-import'),
  require('postcss-preset-env')({
    stage: 1,
    features: {
      'nesting-rules': true,
    },
  }),
  require('autoprefixer')(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano')({ preset: 'default' }));
}

module.exports = {
  plugins,
};
