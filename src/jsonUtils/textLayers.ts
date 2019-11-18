import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import makeResizeConstraint from './resizeConstraint';
import { TextNode, ResizeConstraints, TextStyle, ViewStyle } from '../types';
import { generateID, makeColorFromCSS } from './models';
import { makeStyle, parseStyle } from './style';

import findFontName from '../utils/findFont';

export const TEXT_DECORATION_UNDERLINE = {
  none: FileFormat.UnderlineStyle.None,
  underline: FileFormat.UnderlineStyle.Underlined,
  double: 9,
};

export const TEXT_ALIGN = {
  auto: FileFormat.TextHorizontalAlignment.Left,
  left: FileFormat.TextHorizontalAlignment.Left,
  right: FileFormat.TextHorizontalAlignment.Right,
  center: FileFormat.TextHorizontalAlignment.Centered,
  justify: FileFormat.TextHorizontalAlignment.Justified,
};

const TEXT_ALIGN_REVERSE = {
  [FileFormat.TextHorizontalAlignment.Right]: 'right',
  [FileFormat.TextHorizontalAlignment.Centered]: 'center',
  [FileFormat.TextHorizontalAlignment.Justified]: 'justify',
};

export const TEXT_DECORATION_LINETHROUGH = {
  none: 0,
  'line-through': 1,
};

export const TEXT_TRANSFORM = {
  uppercase: FileFormat.TextTransform.Uppercase,
  lowercase: FileFormat.TextTransform.Lowercase,
  initial: FileFormat.TextTransform.None,
  inherit: FileFormat.TextTransform.None,
  none: FileFormat.TextTransform.None,
  capitalize: FileFormat.TextTransform.None,
};

// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm

export const FONT_STYLES = {
  normal: false,
  italic: true,
  oblique: true,
};

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

const makeFontDescriptor = (style: TextStyle): FileFormat.FontDescriptor => ({
  _class: 'fontDescriptor',
  attributes: {
    name: String(findFontName(style)), // will default to the system font
    size: style.fontSize || 14,
  },
});

const makeTextStyleAttributes = (style: TextStyle) =>
  ({
    underlineStyle: style.textDecoration ? TEXT_DECORATION_UNDERLINE[style.textDecoration] || 0 : 0,
    strikethroughStyle: style.textDecoration
      ? TEXT_DECORATION_LINETHROUGH[style.textDecoration] || 0
      : 0,
    paragraphStyle: {
      _class: 'paragraphStyle',
      alignment: TEXT_ALIGN[style.textAlign || 'auto'],
      paragraphSpacing: style.paragraphSpacing || 0,
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
    MSAttributedStringFontAttribute: makeFontDescriptor(style),
    textStyleVerticalAlignmentKey: 0,
    MSAttributedStringColorAttribute: makeColorFromCSS(style.color || 'black'),
  } as const);

const makeAttribute = (node: TextNode, location: number): FileFormat.StringAttribute => ({
  _class: 'stringAttribute',
  location,
  length: node.content.length,
  attributes: makeTextStyleAttributes(node.textStyles),
});

const makeAttributedString = (textNodes: TextNode[]): FileFormat.AttributedString => {
  const json: FileFormat.AttributedString = {
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

export const makeTextStyle = (style: TextStyle, shadows?: Array<ViewStyle>): FileFormat.Style => {
  const json = makeStyle(style, undefined, shadows);
  json.textStyle = {
    _class: 'textStyle',
    encodedAttributes: makeTextStyleAttributes(style),
    verticalAlignment: FileFormat.TextVerticalAlignment.Top,
  };
  return json;
};

export const parseTextStyle = (json: FileFormat.Style): TextStyle => {
  const style: TextStyle = parseStyle(json);

  if (json.textStyle) {
    if (
      json.textStyle.encodedAttributes.underlineStyle &&
      json.textStyle.encodedAttributes.underlineStyle !== 0
    ) {
      style.textDecoration =
        json.textStyle.encodedAttributes.underlineStyle === 9 ? 'double' : 'underline';
    }

    if (
      json.textStyle.encodedAttributes.strikethroughStyle &&
      json.textStyle.encodedAttributes.strikethroughStyle !== 0
    ) {
      style.textDecoration = 'line-through';
    }

    if (TEXT_ALIGN_REVERSE[json.textStyle.encodedAttributes.paragraphStyle.alignment]) {
      style.textAlign =
        TEXT_ALIGN_REVERSE[json.textStyle.encodedAttributes.paragraphStyle.alignment];
    }

    if (typeof json.textStyle.encodedAttributes.paragraphStyle.minimumLineHeight !== 'undefined') {
      style.lineHeight = json.textStyle.encodedAttributes.paragraphStyle.minimumLineHeight;
    }

    if (typeof json.textStyle.encodedAttributes.kerning !== 'undefined') {
      style.letterSpacing = json.textStyle.encodedAttributes.kerning;
    }

    const color = json.textStyle.encodedAttributes.MSAttributedStringColorAttribute;
    style.color = `#${Math.round(color.red * 255).toString(16)}${Math.round(
      color.green * 255,
    ).toString(16)}${Math.round(color.blue * 255).toString(16)}`;

    if (color.alpha !== 1) {
      style.color += `${Math.round(color.alpha * 255).toString(16)}`;
    }

    if (
      json.textStyle.encodedAttributes.MSAttributedStringTextTransformAttribute !==
      FileFormat.TextTransform.None
    ) {
      style.textTransform =
        json.textStyle.encodedAttributes.MSAttributedStringTextTransformAttribute ===
        FileFormat.TextTransform.Lowercase
          ? 'lowercase'
          : 'uppercase';
    }

    const font = json.textStyle.encodedAttributes.MSAttributedStringFontAttribute;

    style.fontSize = font.attributes.size;

    // we are cheating here, setting the name of the font instead of parsing
    // the family, weight and traits. react-sketchapp will handle it nevertheless
    style.fontFamily = font.attributes.name;
  }

  return style;
};

const makeTextLayer = (
  frame: FileFormat.Rect,
  name: string,
  textNodes: TextNode[],
  _style: ViewStyle,
  resizingConstraint?: ResizeConstraints,
  shadows?: ViewStyle[],
): FileFormat.Text => ({
  _class: 'text',
  do_objectID: generateID(`text:${name}-${textNodes.map(node => node.content).join('')}`),
  frame,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
  name,
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: FileFormat.ResizeType.Stretch,
  rotation: 0,
  shouldBreakMaskChain: false,
  attributedString: makeAttributedString(textNodes),
  style: makeTextStyle((textNodes[0] || { textStyles: {} }).textStyles, shadows),
  automaticallyDrawOnUnderlyingPath: false,
  dontSynchroniseWithSymbol: false,
  // NOTE(akp): I haven't fully figured out the meaning of glyphBounds
  glyphBounds: '',
  // glyphBounds: '{{0, 0}, {116, 17}}',
  lineSpacingBehaviour: FileFormat.LineSpacingBehaviour.ConsistentBaseline,
  textBehaviour: FileFormat.TextBehaviour.Fixed,
  booleanOperation: FileFormat.BooleanOperation.NA,
  exportOptions: {
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
  },
  isFixedToViewport: false,
});

export default makeTextLayer;
