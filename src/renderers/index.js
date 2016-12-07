/* @flow */
import artboard from './ArtboardRenderer';
import view from './ViewRenderer';
import text from './TextRenderer';
import SketchRenderer from './SketchRenderer';

// $FlowFixMe: this flow type should work but doesn't?
const renderers: { [key: string]: SketchRenderer } = {
  artboard,
  view,
  text,
};

module.exports = renderers;
