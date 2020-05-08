const path = require('path');

module.exports = (config) => {
  if (process.env.LOCAL_DEV) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'react-sketchapp': path.resolve(__dirname, '../../lib/'), // FIXME: Should be able to do '../../', as that's a close simulation of an 'npm install' and import 'react-sketchapp'
      },
    };
  }
};
