/* @flow */
import type { SJRect, SJTextLayer } from 'sketchapp-json-flow-types';
import { makeAttributedString } from './hacksForJSONImpl';
import type { TextStyle } from '../types';
import { generateID } from './models';

const makeTextLayer = (frame: SJRect, text: string = '', textStyle: TextStyle): SJTextLayer => ({
  _class: 'text',
  do_objectID: generateID(),
  frame,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name: text,
  nameIsFixed: false,
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  attributedString: makeAttributedString(text, textStyle),
  automaticallyDrawOnUnderlyingPath: false,
  dontSynchroniseWithSymbol: false,
  // NOTE(akp): I haven't fully figured out the meaning of glyphBounds
  glyphBounds: '',
  // glyphBounds: '{{0, 0}, {116, 17}}',
  heightIsClipped: false,
  lineSpacingBehaviour: 2,
  textBehaviour: 1,
});

export default makeTextLayer;
