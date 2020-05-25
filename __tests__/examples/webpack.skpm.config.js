const path = require('path');

const pkg = require(path.resolve(__dirname, 'package.json'));

const aliasedModules = Object.keys(pkg.dependencies);

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react-sketchapp': path.resolve(__dirname, '../../lib'),

      ...aliasedModules.reduce((acc, mod) => {
        acc[mod] = path.resolve(__dirname, `./node_modules/${mod}`);
        return acc;
      }, {}),
    },
  };
};
