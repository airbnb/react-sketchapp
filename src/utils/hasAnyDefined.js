const hasAnyDefined = (obj, names) => names.some(key => obj[key] !== undefined);

export default hasAnyDefined;
