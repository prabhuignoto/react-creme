// Generated using webpack-cli https://github.com/webpack/webpack-cli
// import inputPkg from './components/inputs/package.json' assert { type: 'json' };
import commonPkg from '../components/common/package.json' assert { type: 'json' };
import webpackSharedConfig from '../webpack-shared-config.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const configs = [webpackSharedConfig('common', commonPkg)];

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
