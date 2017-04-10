const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const target = 'basic-webpack-example';

module.exports = {
  entry: {
    main: './src/main.js',
  },

  output: {
    filename: '[name].js',
    library: 'onRun',
    path: path.join(__dirname, `${target}.sketchplugin/Contents/Sketch`),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' },
    ]),
    new WebpackShellPlugin({
      onBuildExit: [
        `/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool run ${target}.sketchplugin main`
       ]
    })
  ],
};
