/* eslint-disable */

const webpack = require("webpack");

module.exports = function(config) {
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.DefinePlugin({
      __dirname: JSON.stringify(__dirname)
    })
  );
};
