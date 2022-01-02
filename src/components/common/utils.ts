export function isUndefined(value: any): boolean {
  return typeof value === "undefined";
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export default function isTouchDevice() {
  return (
    !!(
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        ((window as any).DocumentTouch &&
          typeof document !== "undefined" &&
          document instanceof (window as any).DocumentTouch))
    ) ||
    !!(
      typeof navigator !== "undefined" &&
      (navigator.maxTouchPoints || (navigator as any).msMaxTouchPoints)
    )
  );
}

export function isValidString(value: any): boolean {
  return typeof value === "string" && !isUndefined(value) && value !== null;
}
