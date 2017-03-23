const pick = (obj, keys) => {
  const result = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
};

export default pick;
