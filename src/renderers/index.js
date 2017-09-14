/* @flow */
/* eslint-disable global-require */
// import type SketchRenderer from './SketchRenderer';

const renderers: { [key: string]: any } = {
  document: require('./DocumentRenderer'),
  page: require('./PageRenderer'),
  artboard: require('./ArtboardRenderer'),
  image: require('./ImageRenderer'),
  text: require('./TextRenderer'),
  view: require('./ViewRenderer'),
  symbolinstance: require('./SymbolInstanceRenderer'),
  symbolmaster: require('./SymbolMasterRenderer'),
};

module.exports = renderers;
