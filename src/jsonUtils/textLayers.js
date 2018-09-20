// @flow
import type { SJRect, SJTextLayer } from 'sketchapp-json-flow-types';
import { makeEncodedAttributedString, makeResizeConstraint } from './hacksForJSONImpl';
import type { TextNodes, ResizeConstraints, ViewStyle } from '../types';
import { generateID } from './models';
import { makeStyle } from './style';

const makeTextLayer = (
  frame: SJRect,
  name: string,
  textNodes: TextNodes,
  style: ViewStyle,
  resizingConstraint: ?ResizeConstraints,
  shadows?: Array<ViewStyle>,
): SJTextLayer => ({
  _class: 'text',
  do_objectID: generateID(),
  frame,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name,
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  attributedString: makeEncodedAttributedString(textNodes),
  automaticallyDrawOnUnderlyingPath: false,
  dontSynchroniseWithSymbol: false,
  // NOTE(akp): I haven't fully figured out the meaning of glyphBounds
  glyphBounds: '',
  // glyphBounds: '{{0, 0}, {116, 17}}',
  heightIsClipped: false,
  lineSpacingBehaviour: 2,
  textBehaviour: 1,
  style: makeStyle(style, undefined, shadows),
});

export default makeTextLayer;
