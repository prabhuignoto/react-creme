export function isUndefined(value: any): boolean {
  return typeof value === "undefined";
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}
