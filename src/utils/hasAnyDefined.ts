const hasAnyDefined = (obj: Object, names: readonly string[]): boolean =>
  names.some(key => obj[key] !== undefined);

export default hasAnyDefined;
