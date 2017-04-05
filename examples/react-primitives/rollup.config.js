const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.sketch.js', '.js'],
    }),
    commonjs({
      ignoreGlobal: false,
      namedExports: {
        'node_modules/react/react.js': ['PropTypes'],
        'node_modules/react-primitives/lib/main.js': [
          'Text',
          'Animated',
          'StyleSheet',
          'View',
          'Image',
          'Touchable',
          'Platform',
        ],
      },
    }),
  ],
};
