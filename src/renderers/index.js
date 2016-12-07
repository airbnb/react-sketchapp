/* @flow */
/* eslint-disable global-require */
// import type SketchRenderer from './SketchRenderer';

const renderers: { [key: string]: any } = {
  artboard: require('./ArtboardRenderer'),
  view: require('./ViewRenderer'),
  text: require('./TextRenderer'),
};

module.exports = renderers;
