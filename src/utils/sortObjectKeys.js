// @flow

const sortObjectKeys = (obj: Object): Object => {
  const keys = Object.keys(obj).sort();

  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};

export default sortObjectKeys;
