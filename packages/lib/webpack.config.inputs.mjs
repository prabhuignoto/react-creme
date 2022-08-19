// Generated using webpack-cli https://github.com/webpack/webpack-cli
// import inputPkg from './components/inputs/package.json' assert { type: 'json' };
import inputsPkg from './components/inputs/package.json' assert { type: 'json' };
import webpackCommonConfig from './webpack-common-config.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const configs = [webpackCommonConfig('inputs', inputsPkg)];

export default () => {
  if (isProduction) {
    configs.forEach(config => {
      config.mode = 'production';
    });
  } else {
    configs.forEach(config => {
      config.mode = 'development';
    });
  }
  return configs;
};
