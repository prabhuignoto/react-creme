/* eslint-disable @typescript-eslint/no-explicit-any */

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

// checks if the device is touch based
export const isTouchDevice = (() => {
  return (
    !!(
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        ((window as any).DocumentTouch &&
          typeof document !== 'undefined' &&
          document instanceof (window as any).DocumentTouch))
    ) ||
    !!(
      typeof navigator !== 'undefined' &&
      (navigator.maxTouchPoints || (navigator as any).msMaxTouchPoints)
    )
  );
})() as boolean;

// checks if the given value is a string
export function isValidString(value: any): boolean {
  return typeof value === 'string' && !isUndefined(value) && value !== null;
}

// checks if the app is in dark mode
export function isDark(): boolean {
  return (
    document.documentElement.style.getPropertyValue('--rc-dark-mode') === 'true'
  );
}
