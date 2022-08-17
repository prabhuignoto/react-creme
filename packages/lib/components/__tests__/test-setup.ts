import '@testing-library/jest-dom/extend-expect';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;
