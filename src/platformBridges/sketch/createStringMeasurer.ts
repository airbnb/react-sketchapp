import { Size, TextNode, TextStyle } from '../../types';
import {
  TEXT_DECORATION_UNDERLINE,
  TEXT_DECORATION_LINETHROUGH,
  TEXT_ALIGN,
  TEXT_TRANSFORM,
} from '../../jsonUtils/textLayers';
import { makeColorFromCSS } from '../../jsonUtils/models';
import { findFont } from './findFontName';

// TODO(lmr): do something more sensible here
const FLOAT_MAX = 999999;

function makeParagraphStyle(textStyle: TextStyle) {
  const pStyle = NSMutableParagraphStyle.alloc().init();
  if (textStyle.lineHeight !== undefined) {
    pStyle.minimumLineHeight = textStyle.lineHeight;
    pStyle.lineHeightMultiple = 1.0;
    pStyle.maximumLineHeight = textStyle.lineHeight;
  }

  if (textStyle.textAlign) {
    pStyle.alignment = TEXT_ALIGN[textStyle.textAlign];
  }

  // TODO: check against only positive spacing values?
  if (textStyle.paragraphSpacing !== undefined) {
    pStyle.paragraphSpacing = textStyle.paragraphSpacing;
  }

  return pStyle;
}

// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
function createStringAttributes(textStyles: TextStyle): Object {
  const font = findFont(textStyles);
  const { textDecoration } = textStyles;

  const underline = textDecoration && TEXT_DECORATION_UNDERLINE[textDecoration];
  const strikethrough = textDecoration && TEXT_DECORATION_LINETHROUGH[textDecoration];

  const attribs: any = {
    MSAttributedStringFontAttribute: font.fontDescriptor(),
    NSFont: font,
    NSParagraphStyle: makeParagraphStyle(textStyles),
    NSUnderline: underline || 0,
    NSStrikethrough: strikethrough || 0,
  };

  const color = makeColorFromCSS(textStyles.color || 'black');
  attribs.MSAttributedStringColorAttribute = color;

  if (textStyles.letterSpacing !== undefined && textStyles.letterSpacing !== null) {
    attribs.NSKern = textStyles.letterSpacing;
  }

  if (textStyles.textTransform !== undefined && textStyles.textTransform !== null) {
    attribs.MSAttributedStringTextTransformAttribute = TEXT_TRANSFORM[textStyles.textTransform] * 1;
  }

  return attribs;
}

type NSAttributedString = any;

function createAttributedString(textNode: TextNode): NSAttributedString {
  const { content, textStyles } = textNode;

  const attribs = createStringAttributes(textStyles);

  return NSAttributedString.attributedStringWithString_attributes_(content, attribs);
}

export function createStringMeasurer(textNodes: TextNode[], width: number): Size {
  const fullStr = NSMutableAttributedString.alloc().init();
  textNodes.forEach((textNode) => {
    const newString = createAttributedString(textNode);
    fullStr.appendAttributedString(newString);
  });
  const {
    height: measureHeight,
    width: measureWidth,
  } = fullStr.boundingRectWithSize_options_context(
    CGSizeMake(width, FLOAT_MAX),
    NSStringDrawingUsesLineFragmentOrigin,
    null,
  ).size;
  return { width: measureWidth, height: measureHeight };
}
