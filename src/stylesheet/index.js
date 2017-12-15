import expandStyle from './expandStyle';

const hasOwnProperty = Object.prototype.hasOwnProperty;

let _id = 0;
// eslint-disable-next-line no-plusplus
const guid = () => _id++;
const declarationRegistry = {};

const extractRules = (style) => {
  const declarations = {};

  Object.keys(style).forEach((key) => {
    if (key[0] === ':') {
      // pseudo style. ignore for now.
    } else if (key[0] === '@') {
      // Media query. ignore for now.
    } else {
      declarations[key] = style[key];
    }
  });

  return {
    declarations,
  };
};

const registerStyle = (style) => {
  // TODO(lmr):
  // do "proptype"-like validation here in non-production build
  const id = guid();
  const rules = extractRules(style);
  declarationRegistry[id] = expandStyle(rules.declarations);
  return id;
};

const getStyle = id => declarationRegistry[id];

const create = (styles) => {
  const result = {};
  Object.keys(styles).forEach((key) => {
    result[key] = registerStyle(styles[key]);
  });
  return result;
};

const mergeTransforms = (a, b) => {
  if (!a || a.length === 0) return b; // in this case, a has nothing to contribute.
  const result = [];
  const transformsInA = a.reduce((hash, t) => {
    const key = Object.keys(t)[0];
    result.push(t);
    hash[key] = result.length - 1;
    return hash;
  }, {});
  b.forEach((t) => {
    const key = Object.keys(t)[0];
    const index = transformsInA[key];
    if (index !== undefined) {
      result[index] = t;
    } else {
      result.push(t);
    }
  });
  return result;
};

// merge two style hashes together. Sort of like `Object.assign`, but is aware of `transform` as a
// special case.
// NOTE(lmr): mutates the first argument!
const mergeStyle = (a, b) => {
  let key;
  // eslint-disable-next-line no-restricted-syntax
  for (key in b) {
    if (hasOwnProperty.call(b, key)) {
      switch (key) {
        case 'transform':
          a[key] = mergeTransforms(a[key], b[key]);
          break;
        default:
          /* eslint no-param-reassign: 0 */
          a[key] = b[key];
          break;
      }
    }
  }
  return a;
};

const flattenStyle = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => mergeStyle(acc, flattenStyle(val)), {});
  } else if (typeof input === 'number') {
    return getStyle(input);
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return expandStyle(input);
};

/**
 * A StyleSheet is an abstraction similar to CSS StyleSheets. WIP.
 */
const StyleSheet = {
  hairlineWidth: 1, // TODO(lmr): should this be something different?
  absoluteFill: registerStyle({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }),
  create,
  flatten: flattenStyle,
  resolve: style => ({ style: flattenStyle(style) }),
};

module.exports = StyleSheet;
