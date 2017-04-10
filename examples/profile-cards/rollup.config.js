const sketchLivereload = require('rollup-plugin-sketch-livereload')
const { main } = require('./package.json');

module.exports = {
  plugins: [
    sketchLivereload({
      enabled: process.env.RENDER === 'true',
      bundle: main,
    }),
  ]
}
