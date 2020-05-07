import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeResizeConstraint } from './resizeConstraint';
import { TextNode, ResizeConstraints, TextStyle, ViewStyle, PlatformBridge } from '../types';
import { generateID, makeColorFromCSS } from './models';
import { makeStyle, parseStyle } from './style';

export const TEXT_DECORATION_UNDERLINE: { [key: string]: number } = {
  none: FileFormat.UnderlineStyle.None,
  underline: FileFormat.UnderlineStyle.Underlined,
  double: 9,
  'line-through': 0,
};

export const TEXT_ALIGN: { [key: string]: number } = {
  auto: FileFormat.TextHorizontalAlignment.Left,
  left: FileFormat.TextHorizontalAlignment.Left,
  right: FileFormat.TextHorizontalAlignment.Right,
  center: FileFormat.TextHorizontalAlignment.Centered,
  justify: FileFormat.TextHorizontalAlignment.Justified,
};

const TEXT_ALIGN_REVERSE: { [key: number]: 'center' | 'auto' | 'left' | 'right' | 'justify' } = {
  [FileFormat.TextHorizontalAlignment.Natural]: 'left',
  [FileFormat.TextHorizontalAlignment.Right]: 'right',
  [FileFormat.TextHorizontalAlignment.Centered]: 'center',
  [FileFormat.TextHorizontalAlignment.Justified]: 'justify',
} as const;

export const TEXT_DECORATION_LINETHROUGH: { [key: string]: number } = {
  none: 0,
  underline: 0,
  double: 0,
  'line-through': 1,
};

export const TEXT_TRANSFORM: { [key: string]: number } = {
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

export const FONT_STYLES: { [key: string]: boolean } = {
  normal: false,
  italic: true,
  oblique: true,
};

const makeFontDescriptor = (bridge: PlatformBridge) => (
  style: TextStyle,
): FileFormat.FontDescriptor => ({
  _class: 'fontDescriptor',
  attributes: {
    name: bridge.findFontName(style), // will default to the system font
    size: style.fontSize || 14,
  },
});

const makeTextStyleAttributes = (bridge: PlatformBridge) => (style: TextStyle) =>
  ({
    underlineStyle: style.textDecoration ? TEXT_DECORATION_UNDERLINE[style.textDecoration] || 0 : 0,
    strikethroughStyle: style.textDecoration
      ? TEXT_DECORATION_LINETHROUGH[style.textDecoration] || 0
      : 0,
    paragraphStyle: {
      _class: 'paragraphStyle',
      alignment: TEXT_ALIGN[style.textAlign || 'auto'],
      paragraphSpacing: style.paragraphSpacing || 0,
      ...(typeof style.lineHeight !== 'undefined' && style.lineHeight !== null
        ? {
            minimumLineHeight: style.lineHeight,
            maximumLineHeight: style.lineHeight,
            lineHeightMultiple: 1.0,
          }
        : {}),
    },
    ...(typeof style.letterSpacing !== 'undefined' && style.letterSpacing !== null
      ? {
          kerning: style.letterSpacing,
        }
      : {}),
    ...(typeof style.textTransform !== 'undefined' && style.textTransform !== null
      ? {
          MSAttributedStringTextTransformAttribute: TEXT_TRANSFORM[style.textTransform] * 1,
        }
      : {}),
    MSAttributedStringFontAttribute: makeFontDescriptor(bridge)(style),
    textStyleVerticalAlignmentKey: 0,
    MSAttributedStringColorAttribute: makeColorFromCSS(style.color || 'black'),
  } as const);

const makeAttribute = (bridge: PlatformBridge) => (
  node: TextNode,
  location: number,
): FileFormat.StringAttribute => ({
  _class: 'stringAttribute',
  location,
  length: node.content.length,
  attributes: makeTextStyleAttributes(bridge)(node.textStyles),
});

const makeAttributedString = (bridge: PlatformBridge) => (
  textNodes: TextNode[],
): FileFormat.AttributedString => {
  const json: FileFormat.AttributedString = {
    _class: 'attributedString',
    string: '',
    attributes: [],
  };

  let location = 0;

  textNodes.forEach((node) => {
    json.attributes.push(makeAttribute(bridge)(node, location));
    json.string += node.content;
    location += node.content.length;
  });

  return json;
};

export const makeTextStyle = (bridge: PlatformBridge) => (
  style: TextStyle,
  shadows?: (ViewStyle | undefined | null)[] | null,
): FileFormat.Style => {
  const json = makeStyle(style, undefined, shadows);
  json.textStyle = {
    _class: 'textStyle',
    encodedAttributes: makeTextStyleAttributes(bridge)(style),
    verticalAlignment: FileFormat.TextVerticalAlignment.Top,
  };
  return json;
};

export const parseTextStyle = (json: FileFormat.Style): TextStyle => {
  const style: TextStyle = parseStyle(json);

  if (json.textStyle) {
    const attr = json.textStyle.encodedAttributes;
    if (attr.underlineStyle) {
      style.textDecoration = attr.underlineStyle === 9 ? 'double' : 'underline';
    }

    if (attr.strikethroughStyle) {
      style.textDecoration = 'line-through';
    }

    if (
      attr.paragraphStyle &&
      attr.paragraphStyle.alignment &&
      TEXT_ALIGN_REVERSE[attr.paragraphStyle.alignment]
    ) {
      style.textAlign = TEXT_ALIGN_REVERSE[attr.paragraphStyle.alignment];
    }

    if (attr.paragraphStyle && typeof attr.paragraphStyle.minimumLineHeight !== 'undefined') {
      style.lineHeight = attr.paragraphStyle.minimumLineHeight;
    }

    if (typeof attr.kerning !== 'undefined') {
      style.letterSpacing = attr.kerning;
    }

    const color = json.textStyle.encodedAttributes.MSAttributedStringColorAttribute;
    if (color) {
      style.color = `#${Math.round(color.red * 255).toString(16)}${Math.round(
        color.green * 255,
      ).toString(16)}${Math.round(color.blue * 255).toString(16)}`;

      if (color.alpha !== 1) {
        style.color += `${Math.round(color.alpha * 255).toString(16)}`;
      }
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

export const makeTextLayer = (bridge: PlatformBridge) => (
  frame: FileFormat.Rect,
  name: string,
  textNodes: TextNode[],
  _style: ViewStyle,
  resizingConstraint?: ResizeConstraints | null,
  shadows?: (ViewStyle | undefined | null)[] | null,
): FileFormat.Text => ({
  _class: 'text',
  do_objectID: generateID(`text:${name}-${textNodes.map((node) => node.content).join('')}`),
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
  attributedString: makeAttributedString(bridge)(textNodes),
  style: makeTextStyle(bridge)((textNodes[0] || { textStyles: {} }).textStyles, shadows),
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
