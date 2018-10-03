// @flow
const hasAnyDefined = (obj: Object, names: Array<string>): boolean =>
  names.some(key => obj[key] !== undefined);

export default hasAnyDefined;
