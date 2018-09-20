/* eslint-disable no-bitwise */
// This is the worst code ever. Only there to measure a string when running on node

import type { TextNodes, Size, TextNode, TextStyle } from '../types';
import {
  TEXT_DECORATION_UNDERLINE,
  TEXT_DECORATION_LINETHROUGH,
  TEXT_ALIGN,
  FONT_STYLES,
} from './textLayers';
import hashStyle from '../utils/hashStyle';
import { APPLE_BROKEN_SYSTEM_FONT, TEXT_TRANSFORM } from '../utils/constants';

// This is the ugliest but it's kind of the only way to avoid bundling
// this module when using skpm (the other solution would be to add an `ignore` option
// in every client webpack config...)
let cached$; // cache nodobjc instance
function requireNodobjC() {
  if (cached$) {
    return cached$;
  }
  cached$ = eval("require('nodobjc')"); // eslint-disable-line
  cached$.framework('Foundation');
  cached$.framework('AppKit');
  cached$.framework('CoreGraphics');
  return cached$;
}

// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm

/* eslint-disable quote-props */
const FONT_WEIGHTS = {
  normal: 0,
  bold: 0.4,
  '100': -0.8,
  '200': -0.6,
  '300': -0.4,
  '400': 0,
  '500': 0.23,
  '600': 0.3,
  '700': 0.4,
  '800': 0.56,
  '900': 0.62,
};
/* eslint-enable quote-props */

// TODO(lmr): do something more sensible here
const FLOAT_MAX = 999999;

const useCache = true;
const _cache: Map<number, NSFont> = new Map();

const getCached = (key: number): NSFont => {
  if (!useCache) return undefined;
  return _cache.get(key);
};

const fontNamesForFamilyName = (familyName: string): Array<string> => {
  const $ = requireNodobjC();
  const manager = $.NSFontManager('sharedFontManager');
  const members = manager('availableMembersOfFontFamily', $(familyName));

  if (!members) {
    return [];
  }

  const results = [];
  for (let i = 0; i < members('count'); i += 1) {
    results.push(members('objectAtIndex', i)('objectAtIndex', 0).toString());
  }

  return results;
};

const isItalicFont = (font: NSFont): boolean => {
  const $ = requireNodobjC();
  const fontDescriptor = font('valueForKey', $('fontDescriptor'));
  const traits = fontDescriptor('objectForKey', $('NSCTFontTraitsAttribute'));
  const symbolicTraits = parseInt(traits('valueForKey', $('NSCTFontSymbolicTrait')).toString(), 10);

  const NSFontItalicTrait = 1 << 0;
  return (symbolicTraits & NSFontItalicTrait) !== 0;
};

const isCondensedFont = (font: NSFont): boolean => {
  const $ = requireNodobjC();
  const fontDescriptor = font('valueForKey', $('fontDescriptor'));
  const traits = fontDescriptor('objectForKey', $('NSCTFontTraitsAttribute'));
  const symbolicTraits = parseInt(traits('valueForKey', $('NSCTFontSymbolicTrait')).toString(), 10);

  const NSFontCondensedTrait = 1 << 6;
  return (symbolicTraits & NSFontCondensedTrait) !== 0;
};

const weightOfFont = (font: NSFont): number => {
  const $ = requireNodobjC();
  const fontDescriptor = font('valueForKey', $('fontDescriptor'));
  const traits = fontDescriptor('objectForKey', $('NSCTFontTraitsAttribute'));

  const weight = parseFloat(traits('valueForKey', $('NSCTFontWeightTrait')).toString());

  if (weight === 0.0) {
    const weights = Object.keys(FONT_WEIGHTS);
    const fontName = font('valueForKey', $('fontName'))
      .toString()
      .toLowerCase();
    const matchingWeight = weights.find(w => fontName.endsWith(w));
    if (matchingWeight) {
      return FONT_WEIGHTS[matchingWeight];
    }
  }

  return weight;
};

function findFont(style: TextStyle): NSFont {
  const $ = requireNodobjC();
  const cacheKey = hashStyle(style);

  let font = getCached(cacheKey);
  if (font) {
    return font;
  }
  const defaultFontFamily = $.NSFont('systemFontOfSize', 14)(
    'valueForKey',
    $('familyName'),
  ).toString();
  const defaultFontWeight = 0;
  const defaultFontSize = 14;

  const fontSize = style.fontSize ? style.fontSize : defaultFontSize;
  let fontWeight = style.fontWeight
    ? FONT_WEIGHTS[String(style.fontWeight)] || defaultFontWeight
    : defaultFontWeight;
  // Default to Helvetica if fonts are missing
  let familyName =
    // Must use two equals (==) for compatibility with Cocoascript
    // eslint-disable-next-line eqeqeq
    defaultFontFamily == APPLE_BROKEN_SYSTEM_FONT ? 'Helvetica' : defaultFontFamily;
  let isItalic = false;
  let isCondensed = false;

  if (style.fontFamily) {
    familyName = style.fontFamily;
  }

  if (style.fontStyle) {
    isItalic = FONT_STYLES[style.fontStyle] || false;
  }

  let didFindFont = false;

  // Handle system font as special case. This ensures that we preserve
  // the specific metrics of the standard system font as closely as possible.
  if (familyName === defaultFontFamily || familyName === 'System') {
    font = $.NSFont('systemFontOfSize', fontSize, 'weight', fontWeight);

    if (font) {
      didFindFont = true;

      if (isItalic || isCondensed) {
        let fontDescriptor = font('valueForKey', $('fontDescriptor'));
        let symbolicTraits = fontDescriptor('valueForKey', $('symbolicTraits'));
        if (isItalic) {
          symbolicTraits |= 1 << 0;
        }

        if (isCondensed) {
          symbolicTraits |= 1 << 6;
        }

        fontDescriptor = fontDescriptor('fontDescriptorWithSymbolicTraits', symbolicTraits);
        font = $.NSFont('fontWithDescriptor', fontDescriptor, 'size', fontSize);
      }
    }
  }

  const fontNames = fontNamesForFamilyName(familyName);

  // Gracefully handle being given a font name rather than font family, for
  // example: "Helvetica Light Oblique" rather than just "Helvetica".
  if (!didFindFont && fontNames.length === 0) {
    font = $.NSFont('fontWithName', $(familyName), 'size', fontSize);
    if (font) {
      // It's actually a font name, not a font family name,
      // but we'll do what was meant, not what was said.
      familyName = font.familyName();
      fontWeight = style.fontWeight ? fontWeight : weightOfFont(font);
      isItalic = style.fontStyle ? isItalic : isItalicFont(font);
      isCondensed = isCondensedFont(font);
    } else {
      console.log(`Unrecognized font family '${familyName}'`);
      font = $.NSFont('systemFontOfSize', fontSize, 'weight', fontWeight);
    }
  }

  // Get the closest font that matches the given weight for the fontFamily
  let closestWeight = Infinity;
  for (let i = 0; i < fontNames.length; i += 1) {
    const match = $.NSFont('fontWithName', $(fontNames[i]), 'size', fontSize);

    if (isItalic === isItalicFont(match) && isCondensed === isCondensedFont(match)) {
      const testWeight = weightOfFont(match);

      if (Math.abs(testWeight - fontWeight) < Math.abs(closestWeight - fontWeight)) {
        font = match;
        closestWeight = testWeight;
      }
    }
  }

  // If we still don't have a match at least return the first font in the fontFamily
  // This is to support built-in font Zapfino and other custom single font families like Impact
  if (!font) {
    if (fontNames.length > 0) {
      font = $.NSFont('fontWithName', $(fontNames[0]), 'size', fontSize);
    }
  }

  // TODO(gold): support opentype features: small-caps & number types

  if (font) {
    _cache.set(cacheKey, font);
  }

  return font;
}

export function findFontName(style: TextStyle): String {
  const $ = requireNodobjC();
  const font = findFont(style);
  const fontDescriptor = font('valueForKey', $('fontDescriptor'));
  return fontDescriptor('valueForKey', $('postscriptName'));
}

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

export function createAttributedString(textNode: TextNode): NSAttributedString {
  const $ = requireNodobjC();
  const { content, textStyles } = textNode;

  const attribs = createStringAttributes(textStyles);

  return $.NSAttributedString('alloc')('initWithString', $(content), 'attributes', attribs);
}

export const createNodeJSStringMeasurer = (textNodes: TextNodes, width: number): Size => {
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
};
