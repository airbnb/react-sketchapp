const livereload = require('rollup-plugin-sketch-livereload')
const { main } = require('./package.json');

module.exports = {
  plugins: [
    livereload({
      enabled: process.env.render === 'true',
      bundle: main,
    }),
  ]
}
