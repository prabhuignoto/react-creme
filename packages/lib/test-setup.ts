import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

process.on('unhandledRejection', reason => {
  // eslint-disable-next-line no-console
  console.log(`FAILED TO HANDLE`);
  throw reason;
});
