export const hasAnyDefined = (obj: { [key: string]: unknown }, names: readonly string[]): boolean =>
  names.some((key) => obj[key] !== undefined);
