// Generated using webpack-cli https://github.com/webpack/webpack-cli
// import inputPkg from './components/inputs/package.json' assert { type: 'json' };
import overlayPkg from './components/overlay/package.json' assert { type: 'json' };

import webpackCommonConfig from './webpack-common-config.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const configs = [webpackCommonConfig('overlay', overlayPkg)];

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
