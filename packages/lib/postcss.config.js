module.exports = {
  // parser: 'postcss-scss',
  plugins: [
    require('postcss-preset-env'),
    require('cssnano'),
    require('autoprefixer'),
  ],
};
