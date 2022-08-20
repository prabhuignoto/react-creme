// Generated using webpack-cli https://github.com/webpack/webpack-cli

import feedbackPkg from '../components/feedback/package.json' assert { type: 'json' };
import inputPkg from '../components/inputs/package.json' assert { type: 'json' };
// import corePkg from '../components/core/package.json' assert { type: 'json' };
import overlayPkg from '../components/overlay/package.json' assert { type: 'json' };
import dataPkg from '../components/data/package.json' assert { type: 'json' };
// import commonPkg from '../components/common/package.json' assert { type: 'json' };
import layoutPkg from '../components/layout/package.json' assert { type: 'json' };
import webpackSharedConfig from '../webpack-shared-config.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const configs = [
  webpackSharedConfig('feedback', feedbackPkg),
  // webpackSharedConfig('common', commonPkg),
  webpackSharedConfig('inputs', inputPkg),
  webpackSharedConfig('data', dataPkg),
  webpackSharedConfig('overlay', overlayPkg),
  webpackSharedConfig('layout', layoutPkg),
];

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
