// Generated using webpack-cli https://github.com/webpack/webpack-cli
// import inputPkg from './components/inputs/package.json' assert { type: 'json' };
import feedbackPkg from '../components/feedback/package.json' assert { type: 'json' };
import webpackSharedConfig from '../webpack-shared-config.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const configs = [webpackSharedConfig('feedback', feedbackPkg)];

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
