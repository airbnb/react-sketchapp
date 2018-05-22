// @flow
/* eslint-disable global-require */
// import type SketchRenderer from './SketchRenderer';

export default {
  artboard: require('./ArtboardRenderer'),
  image: require('./ImageRenderer'),
  svg: require('./SvgRenderer'),
  text: require('./TextRenderer'),
  view: require('./ViewRenderer'),
  symbolinstance: require('./SymbolInstanceRenderer'),
  symbolmaster: require('./SymbolMasterRenderer'),
};
