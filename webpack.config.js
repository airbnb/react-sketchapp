const path = require('path');

const entries = [
  'Layer From Props',
  'Test Run',
  'Test React',
].reduce((acc, val) => (
  Object.assign({}, acc, { [val]: `./example-plugin/${val}.js` })
), {});

module.exports = {
  entry: entries,

  output: {
    filename: '[name].js',
    library: 'onRun',
    path: path.join(__dirname, 'react-example.sketchplugin/Contents/Sketch'),
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};
