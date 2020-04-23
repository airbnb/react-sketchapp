export const sortObjectKeys = <T extends { [key: string]: unknown }>(obj: T): T => {
  const keys = Object.keys(obj).sort();
  // @ts-ignore
  const acc: T = {};
  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), acc);
};
