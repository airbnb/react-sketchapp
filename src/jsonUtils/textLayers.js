// @flow
import type { SJRect, SJTextLayer } from 'sketchapp-json-flow-types';
import { TextAlignment } from 'sketch-constants';
import getSketchVersion from '../utils/getSketchVersion';
import makeResizeConstraint from './resizeConstraint';
import { makeEncodedAttributedString, makeEncodedTextStyleAttributes } from './hacksForJSONImpl';
import type { TextNode, TextNodes, ResizeConstraints, TextStyle, ViewStyle } from '../types';
import { generateID, makeColorFromCSS } from './models';
import { TEXT_TRANSFORM } from '../utils/constants';
import { makeStyle } from './style';

import findFontInSketch from '../utils/findFont';
import { findFontName as findFontInNode } from './hacksForNodObjCImpl';

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

const sketchVersion = getSketchVersion();

export const getFontName = (style: TextStyle) => {
  // if we are running in node
  if (sketchVersion === 'NodeJS') {
    return findFontInNode(style);
  }

  const font = findFontInSketch(style);
  return font.fontDescriptor().postscriptName();
};

const makeFontDescriptor = (style: TextStyle) => ({
  _class: 'fontDescriptor',
  attributes: {
    name: String(getFontName(style)), // will default to the system font
    size: style.fontSize || 14,
  },
});

const makeTextStyleAttributes = (style: TextStyle) => ({
  underlineStyle: style.textDecoration ? TEXT_DECORATION_UNDERLINE[style.textDecoration] || 0 : 0,
  strikethroughStyle: style.textDecoration
    ? TEXT_DECORATION_LINETHROUGH[style.textDecoration] || 0
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
  ...(typeof style.textTransform !== 'undefined'
    ? {
        MSAttributedStringTextTransformAttribute: TEXT_TRANSFORM[style.textTransform] * 1,
      }
    : {}),
  ...(typeof style.paragraphSpacing !== 'undefined'
    ? {
        paragraphSpacing: style.paragraphSpacing,
      }
    : {}),
  MSAttributedStringFontAttribute: makeFontDescriptor(style),
  textStyleVerticalAlignmentKey: 0,
  MSAttributedStringColorAttribute: makeColorFromCSS(style.color || 'black'),
});

const makeAttribute = (node: TextNode, location: number) => ({
  _class: 'stringAttribute',
  location,
  length: node.content.length,
  attributes: makeTextStyleAttributes(node.textStyles),
});

const makeAttributedString = (textNodes: TextNodes): any => {
  const json = {
    _class: 'attributedString',
    string: '',
    attributes: [],
  };

  let location = 0;

  textNodes.forEach(node => {
    json.attributes.push(makeAttribute(node, location));
    json.string += node.content;
    location += node.content.length;
  });

  return json;
};

export const makeTextStyle = (style: TextStyle, shadows?: Array<ViewStyle>) => {
  const json = makeStyle(style, undefined, shadows);
  json.textStyle = {
    _class: 'textStyle',
    encodedAttributes:
      sketchVersion === 'NodeJS' || sketchVersion >= 49
        ? makeTextStyleAttributes(style)
        : makeEncodedTextStyleAttributes(style),
  };
  return json;
};

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
  attributedString:
    sketchVersion === 'NodeJS' || sketchVersion >= 49
      ? makeAttributedString(textNodes)
      : makeEncodedAttributedString(textNodes),
  style:
    sketchVersion === 'NodeJS' || sketchVersion >= 49
      ? makeTextStyle((textNodes[0] || { textStyles: {} }).textStyles, shadows)
      : undefined,
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
