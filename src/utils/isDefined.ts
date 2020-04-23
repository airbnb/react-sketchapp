export const isDefined = (value: unknown): value is number =>
  value !== null && typeof value !== 'undefined';
