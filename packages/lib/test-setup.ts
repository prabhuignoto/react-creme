import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import ResizeObserver from 'resize-observer-polyfill';

// Extend matchers with jest-axe
expect.extend(toHaveNoViolations);

global.ResizeObserver = ResizeObserver;

// Declare axe globally for accessibility testing
declare global {
  // eslint-disable-next-line no-var
  var axe: typeof axe;
}

globalThis.axe = axe;

process.on('unhandledRejection', reason => {
  // eslint-disable-next-line no-console
  console.log(`FAILED TO HANDLE`);
  throw reason;
});
