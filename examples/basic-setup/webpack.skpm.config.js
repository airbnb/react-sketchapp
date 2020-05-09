const path = require('path');

module.exports = (config) => {
  if (process.env.LOCAL_DEV) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'react-sketchapp': path.resolve(__dirname, '../../'),
      },
    };
  }
};
