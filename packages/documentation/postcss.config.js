//postcss config
import PostCSSImport from 'postcss-import';
import PostCSSPresetEnv from 'postcss-preset-env';
import PostCSSReporter from 'postcss-reporter';

module.exports = {
  plugins: [PostCSSImport(), PostCSSReporter(), PostCSSPresetEnv()],
};
