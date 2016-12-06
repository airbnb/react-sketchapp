/* eslint-disable global-require */
import type SketchRenderer from './SketchRenderer';

const renderers: { [key: string]: SketchRenderer } = {
  artboard: require('./ArtboardRenderer'),
  view: require('./ViewRenderer'),
  text: require('./TextRenderer'),
};

module.exports = renderers;
