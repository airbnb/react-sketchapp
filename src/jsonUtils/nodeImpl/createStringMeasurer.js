import requireNodobjC from './requireNodobjC';

import type { TextNodes, Size, TextNode, TextStyle } from '../../types';
import { TEXT_DECORATION_UNDERLINE, TEXT_DECORATION_LINETHROUGH, TEXT_ALIGN } from '../textLayers';
import { TEXT_TRANSFORM } from '../../utils/constants';
import { findFont } from './findFontName';

// TODO(lmr): do something more sensible here
const FLOAT_MAX = 999999;

function makeParagraphStyle(textStyle) {
  const $ = requireNodobjC();
  const pStyle = $.NSMutableParagraphStyle('alloc')('init');
  if (textStyle.lineHeight !== undefined) {
    pStyle('setMinimumLineHeight', textStyle.lineHeight);
    pStyle('setLineHeightMultiple', 1.0);
    pStyle('setMaximumLineHeight', textStyle.lineHeight);
  }

  if (textStyle.textAlign && TEXT_ALIGN[textStyle.textAlign]) {
    pStyle('setAlignment', TEXT_ALIGN[textStyle.textAlign]);
  }

  return pStyle;
}

function createStringAttributes(textStyles: TextStyle): Object {
  const $ = requireNodobjC();
  const font = findFont(textStyles);
  const { textDecoration } = textStyles;

  const attribs = $.NSMutableDictionary('alloc')('init');
  const fontDescriptor = font('valueForKey', $('fontDescriptor'));

  attribs('setValue', fontDescriptor, 'forKey', $('MSAttributedStringFontAttribute'));
  attribs('setValue', font, 'forKey', $('NSFont'));
  attribs('setValue', makeParagraphStyle(textStyles), 'forKey', $('NSParagraphStyle'));
  attribs(
    'setValue',
    textDecoration ? TEXT_DECORATION_UNDERLINE[textDecoration] || 0 : 0,
    'forKey',
    $('NSUnderline'),
  );
  attribs(
    'setValue',
    textDecoration ? TEXT_DECORATION_LINETHROUGH[textDecoration] || 0 : 0,
    'forKey',
    $('NSStrikethrough'),
  );

  if (textStyles.letterSpacing !== undefined) {
    attribs('setValue', $(textStyles.letterSpacing), 'forKey', $('NSKern'));
  }

  if (textStyles.textTransform !== undefined) {
    attribs(
      'setValue',
      TEXT_TRANSFORM[textStyles.textTransform] * 1,
      'forKey',
      $('MSAttributedStringTextTransformAttribute'),
    );
  }

  return attribs;
}

function createAttributedString(textNode: TextNode): NSAttributedString {
  const $ = requireNodobjC();
  const { content, textStyles } = textNode;

  const attribs = createStringAttributes(textStyles);

  return $.NSAttributedString('alloc')('initWithString', $(content), 'attributes', attribs);
}

export default function createStringMeasurer(textNodes: TextNodes, width: number): Size {
  const $ = requireNodobjC();
  const pool = $.NSAutoreleasePool('alloc')('init');
  const fullStr = $.NSMutableAttributedString('alloc')('init');
  textNodes.forEach(textNode => {
    const newString = createAttributedString(textNode);
    fullStr('appendAttributedString', newString);
  });
  const { height: measureHeight, width: measureWidth } = fullStr(
    'boundingRectWithSize',
    $.CGSizeMake(width, FLOAT_MAX),
    'options',
    $.NSStringDrawingUsesLineFragmentOrigin,
    'context',
    null,
  ).size;
  pool('drain');
  return { width: measureWidth, height: measureHeight };
}
