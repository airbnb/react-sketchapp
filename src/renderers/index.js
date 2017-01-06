/* @flow */
/* eslint-disable global-require */
// import type SketchRenderer from './SketchRenderer';

const renderers: { [key: string]: any } = {
  artboard: require('./ArtboardRenderer'),
  image: require('./ImageRenderer'),
  sharedStyles: require('./SharedStylesRenderer'),
  text: require('./TextRenderer'),
  view: require('./ViewRenderer'),
};

module.exports = renderers;
