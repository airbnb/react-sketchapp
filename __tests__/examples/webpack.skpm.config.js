const path = require('path');

const aliasedModules = [
  'chroma-js',
  'ramda',
  'react-primitives',
  '@emotion/primitives',
  '@emotion/core',
];

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react-sketchapp': path.resolve(__dirname, '../../'),

      ...aliasedModules.reduce((acc, mod) => {
        acc[mod] = path.resolve(__dirname, `./node_modules/${mod}`);
        return acc;
      }, {}),
    },
  };
};
