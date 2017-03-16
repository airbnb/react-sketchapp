/* @flow */
import type { SJRect, SJTextLayer } from 'sketchapp-json-flow-types';
import { makeAttributedString } from './hacksForJSONImpl';
import type { TextStyle } from '../types';
import { generateID } from './models';

const makeTextLayer = (
  frame: SJRect,
  text: ?string,
  textStyle: TextStyle,
): SJTextLayer => ({
  _class: 'text',
  do_objectID: generateID(),
  // exportOptions: {
  //   _class: 'exportOptions',
  //   exportFormats: [],
  //   includedLayerIds: [],
  //   layerOptions: 0,
  //   shouldTrim: false
  // },
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
  // NOTE(akp): It works to omit this entirely
  // style: {
  //   _class: 'style',
  //   endDecorationType: 0,
  //   miterLimit: 10,
  //   startDecorationType: 0,
  // NOTE(akp): The text style seems to mirror the attributed string, so it's faster to not set it
  //   // textStyle: makeTextStyle(textStyle),
  // },
  attributedString: makeAttributedString(text, textStyle),
  // {
  //   _class: MSAttributedString,
  //   archivedAttributedString: {
  //     _archive: YnBsaXN0MDDUAQIDBAUG…
  //   }
  // },
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
