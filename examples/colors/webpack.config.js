const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const target = 'colors';

const plugins = [
  new CopyWebpackPlugin([{
    from: 'src/manifest.json'
  }])
 ];

if (process.env.RENDER === 'true') {
  plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: [
        `/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool run ${target}.sketchplugin main`,
      ],
      dev: false,
    })
  );
}

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

  plugins,
};
