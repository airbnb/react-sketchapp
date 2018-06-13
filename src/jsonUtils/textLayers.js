// @flow
import type { SJRect, SJTextLayer } from 'sketchapp-json-flow-types';
import { TextAlignment } from 'sketch-constants';
import getSketchVersion from '../utils/getSketchVersion';
import { makeEncodedAttributedString, makeResizeConstraint } from './hacksForJSONImpl';
import type { TextNode, TextNodes, ResizeConstraints, TextStyle } from '../types';
import { generateID, makeColorFromCSS } from './models';

export const TEXT_DECORATION_UNDERLINE = {
  none: 0,
  underline: 1,
  double: 9,
};

export const TEXT_ALIGN = {
  auto: TextAlignment.Left,
  left: TextAlignment.Left,
  right: TextAlignment.Right,
  center: TextAlignment.Center,
  justify: TextAlignment.Justified,
};

export const TEXT_DECORATION_LINETHROUGH = {
  none: 0,
  'line-through': 1,
};

// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm

export const FONT_STYLES = {
  normal: false,
  italic: true,
  oblique: true,
};

/* eslint-disable quote-props */
export const FONT_WEIGHTS = {
  normal: 'Regular',
  ultralight: 'UltraLight',
  thin: 'Thin',
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  semibold: 'Semibold',
  demibold: 'Semibold',
  extrabold: 'Heavy',
  bold: 'Bold',
  heavy: 'Heavy',
  black: 'Black',
  '100': 'UltraLight',
  '200': 'Thin',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'Semibold',
  '700': 'Bold',
  '800': 'Heavy',
  '900': 'Black',
};
/* eslint-enable */

const makeFontDescriptor = (style: TextStyle) => {
  const json = {
    _class: 'fontDescriptor',
    attributes: {
      name: style.fontFamily || '__font_not_found', // will default to the system font
      size: style.fontSize || 14,
    },
  };

  if (style.fontWeight && FONT_WEIGHTS[style.fontWeight] && style.fontFamily) {
    json.attributes.name += `-${FONT_WEIGHTS[style.fontWeight]}`;
  }

  return json;
};

const makeAttribute = (node: TextNode, location: number) => {
  // TODO: italic
  const style = node.textStyles;
  return {
    _class: 'stringAttribute',
    location,
    length: node.content.length,
    attributes: {
      underlineStyle: style.textDecoration ? TEXT_DECORATION_UNDERLINE[style.textDecoration] : 0,
      strikethroughStyle: style.textDecoration
        ? TEXT_DECORATION_LINETHROUGH[style.textDecoration]
        : 0,
      paragraphStyle: {
        _class: 'paragraphStyle',
        alignment: TEXT_ALIGN[style.textAlign || 'auto'],
        ...(typeof style.lineHeight !== 'undefined'
          ? {
            minimumLineHeight: style.lineHeight,
            maximumLineHeight: style.lineHeight,
            lineHeightMultiple: 1.0,
          }
          : {}),
      },
      ...(typeof style.letterSpacing !== 'undefined'
        ? {
          kerning: style.letterSpacing,
        }
        : {}),
      MSAttributedStringFontAttribute: makeFontDescriptor(style),
      textStyleVerticalAlignmentKey: 0,
      MSAttributedStringColorAttribute: makeColorFromCSS(style.color || 'black'),
    },
  };
};

const makeAttributedString = (textNodes: TextNodes): any => {
  const json = {
    _class: 'attributedString',
    string: '',
    attributes: [],
  };

  let location = 0;

  textNodes.forEach((node) => {
    json.attributes.push(makeAttribute(node, location));
    json.string += node.content;
    location += node.content.length;
  });

  return json;
};

const makeTextLayer = (
  frame: SJRect,
  name: string,
  textNodes: TextNodes,
  resizingConstraint: ?ResizeConstraints,
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
  attributedString:
    getSketchVersion() >= 49 || getSketchVersion() === 0
      ? makeAttributedString(textNodes)
      : makeEncodedAttributedString(textNodes),
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
