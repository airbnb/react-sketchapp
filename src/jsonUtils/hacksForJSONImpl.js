// @flow
// We need native macOS fonts and colors for these hacks so import the old utils
import type { SJTextStyle } from 'sketchapp-json-flow-types';
import { TextAlignment } from 'sketch-constants';
import { toSJSON } from 'sketchapp-json-plugin';
import findFont from '../utils/findFont';
import getSketchVersion from '../utils/getSketchVersion';
import type { TextNodes, TextNode, TextStyle, ResizeConstraints, LayoutInfo } from '../types';
import { generateID, makeColorFromCSS } from './models';

export const TEXT_ALIGN = {
  auto: TextAlignment.Left,
  left: TextAlignment.Left,
  right: TextAlignment.Right,
  center: TextAlignment.Center,
  justify: TextAlignment.Justified,
};

export const TEXT_DECORATION_UNDERLINE = {
  none: 0,
  underline: 1,
  double: 9,
};

export const TEXT_DECORATION_LINETHROUGH = {
  none: 0,
  'line-through': 1,
};

// this doesn't exist in constants
export const TEXT_TRANSFORM = {
  uppercase: 1,
  lowercase: 2,
  initial: 0,
  inherit: 0,
  none: 0,
  capitalize: 0,
};

/*
  RESIZE CONSTRAINT RULES

  Order of properties as map keys:
  1. top
  2. right
  3. bottom
  4: left
  5. fixedHeight
  6. fixedWidth
 */

const RESIZE_CONSTRAINTS = {
  top_left_fixedHeight_fixedWidth: 9,
  top_right_left_fixedHeight: 10,
  top_left_fixedHeight: 11,
  top_right_fixedHeight_fixedWidth: 12,
  top_fixedHeight_fixedWidth: 13,
  top_right_fixedHeight: 14,
  top_fixedHeight: 15,
  top_bottom_left_fixedWidth: 17,
  top_right_bottom_left: 18,
  top_bottom_left: 19,
  top_right_bottom_fixedWidth: 20,
  top_bottom_fixedWidth: 21,
  top_right_bottom: 22,
  top_bottom: 23,
  top_left_fixedWidth: 25,
  top_right_left: 26,
  top_left: 27,
  top_right_fixedWidth: 28,
  top_fixedWidth: 29,
  top_right: 30,
  top: 31,
  bottom_left_fixedHeight_fixedWidth: 33,
  right_bottom_left_fixedHeight: 34,
  bottom_left_fixedHeight: 35,
  right_bottom_fixedHeight_fixedWidth: 36,
  bottom_fixedHeight_fixedWidth: 37,
  right_bottom_fixedHeight: 38,
  bottom_fixedHeight: 39,
  left_fixedHeight_fixedWidth: 41,
  right_left_fixedHeight: 42,
  left_fixedHeight: 43,
  right_fixedHeight_fixedWidth: 44,
  fixedHeight_fixedWidth: 45,
  right_fixedHeight: 46,
  fixedHeight: 47,
  bottom_left_fixedWidth: 49,
  right_bottom_left: 50,
  bottom_left: 51,
  right_bottom_fixedWidth: 52,
  bottom_fixedWidth: 53,
  right_bottom: 54,
  bottom: 55,
  left_fixedWidth: 57,
  right_left: 58,
  left: 59,
  right_fixedWidth: 60,
  fixedWidth: 61,
  right: 62,
  none: 63,
};

// NOTE(gold): toSJSON doesn't recursively parse JS objects
// https://github.com/airbnb/react-sketchapp/pull/73#discussion_r108529703
function encodeSketchJSON(sketchObj): Object {
  const encoded = toSJSON(sketchObj);
  return encoded ? JSON.parse(encoded) : {};
}

function makeParagraphStyle(textStyle) {
  const pStyle = NSMutableParagraphStyle.alloc().init();
  if (textStyle.lineHeight !== undefined) {
    pStyle.minimumLineHeight = textStyle.lineHeight;
    pStyle.lineHeightMultiple = 1.0;
    pStyle.maximumLineHeight = textStyle.lineHeight;
  }

  if (textStyle.textAlign) {
    pStyle.alignment = TEXT_ALIGN[textStyle.textAlign];
  }

  return pStyle;
}

export const makeImageDataFromUrl = (url: string): MSImageData => {
  let fetchedData = NSData.dataWithContentsOfURL(NSURL.URLWithString(url));

  if (fetchedData) {
    const firstByte = fetchedData.subdataWithRange(NSMakeRange(0, 1)).description();

    // Check for first byte. Must use non-type-exact matching (!=).
    // 0xFF = JPEG, 0x89 = PNG, 0x47 = GIF, 0x49 = TIFF, 0x4D = TIFF
    if (
      /* eslint-disable eqeqeq */
      firstByte != '<ff>' &&
      firstByte != '<89>' &&
      firstByte != '<47>' &&
      firstByte != '<49>' &&
      firstByte != '<4d>'
      /* eslint-enable eqeqeq */
    ) {
      fetchedData = null;
    }
  }

  let image;

  if (!fetchedData) {
    const errorUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';
    image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(errorUrl));
  } else {
    image = NSImage.alloc().initWithData(fetchedData);
  }

  if (MSImageData.alloc().initWithImage_convertColorSpace !== undefined) {
    return MSImageData.alloc().initWithImage_convertColorSpace(image, false);
  }
  return MSImageData.alloc().initWithImage(image);
};

export function makeResizeConstraint(resizingConstraint: ?ResizeConstraints): number {
  if (resizingConstraint) {
    const constraints = [];
    const {
      top, right, bottom, left, fixedHeight, fixedWidth,
    } = resizingConstraint;

    if (top) {
      constraints.push('top');
    }
    if (right) {
      constraints.push('right');
    }
    if (bottom) {
      constraints.push('bottom');
    }
    if (left) {
      constraints.push('left');
    }
    if (fixedHeight) {
      constraints.push('fixedHeight');
    }
    if (fixedWidth) {
      constraints.push('fixedWidth');
    }

    if (constraints.length > 0) {
      const constraint = RESIZE_CONSTRAINTS[constraints.join('_')];
      if (!constraint) {
        throw new Error(
          `\n${JSON.stringify(
            resizingConstraint,
            null,
            2,
          )}\nconstraint is not a valid combination.`,
        );
      }
      return constraint;
    }
  }

  return RESIZE_CONSTRAINTS.none; // No constraints
}

// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
function createStringAttributes(textStyles: TextStyle): Object {
  const font = findFont(textStyles);
  const { textDecoration } = textStyles;

  const underline = textDecoration && TEXT_DECORATION_UNDERLINE[textDecoration];
  const strikethrough = textDecoration && TEXT_DECORATION_LINETHROUGH[textDecoration];

  const attribs: Object = {
    MSAttributedStringFontAttribute: font.fontDescriptor(),
    NSFont: font,
    NSParagraphStyle: makeParagraphStyle(textStyles),
    NSUnderline: underline || 0,
    NSStrikethrough: strikethrough || 0,
  };

  const color = makeColorFromCSS(textStyles.color || 'black');

  if (getSketchVersion() >= 50) {
    attribs.MSAttributedStringColorAttribute = color;
  } else {
    attribs.NSColor = NSColor.colorWithDeviceRed_green_blue_alpha(
      color.red,
      color.green,
      color.blue,
      color.alpha,
    );
  }

  if (textStyles.letterSpacing !== undefined) {
    attribs.NSKern = textStyles.letterSpacing;
  }

  if (textStyles.textTransform !== undefined) {
    attribs.MSAttributedStringTextTransformAttribute = TEXT_TRANSFORM[textStyles.textTransform] * 1;
  }

  return attribs;
}

export function createAttributedString(textNode: TextNode): NSAttributedString {
  const { content, textStyles } = textNode;

  const attribs = createStringAttributes(textStyles);

  return NSAttributedString.attributedStringWithString_attributes_(content, attribs);
}

export function makeEncodedAttributedString(textNodes: TextNodes) {
  const fullStr = NSMutableAttributedString.alloc().init();

  textNodes.forEach((textNode) => {
    const newString = createAttributedString(textNode);
    fullStr.appendAttributedString(newString);
  });

  const encodedAttribStr = MSAttributedString.encodeAttributedString(fullStr);

  const msAttribStr = MSAttributedString.alloc().initWithEncodedAttributedString(encodedAttribStr);
  return encodeSketchJSON(msAttribStr);
}

export function makeTextStyle(textStyle: TextStyle) {
  const pStyle = makeParagraphStyle(textStyle);

  const font = findFont(textStyle);

  const color = makeColorFromCSS(textStyle.color || 'black');

  const value: SJTextStyle = {
    _class: 'textStyle',
    encodedAttributes: {
      MSAttributedStringFontAttribute: encodeSketchJSON(font.fontDescriptor()),
      NSFont: font,
      NSColor: encodeSketchJSON(
        NSColor.colorWithDeviceRed_green_blue_alpha(
          color.red,
          color.green,
          color.blue,
          color.alpha,
        ),
      ),
      NSParagraphStyle: encodeSketchJSON(pStyle),
      NSKern: textStyle.letterSpacing || 0,
      MSAttributedStringTextTransformAttribute:
        TEXT_TRANSFORM[textStyle.textTransform || 'initial'] * 1,
    },
  };

  return {
    _class: 'style',
    sharedObjectID: generateID(),
    miterLimit: 10,
    startDecorationType: 0,
    endDecorationType: 0,
    textStyle: value,
  };
}

export function makeSvgLayer(layout: LayoutInfo, name: string, svg: string) {
  const svgString = NSString.stringWithString(svg);
  const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData);
  const svgLayer = svgImporter.importAsLayer();
  svgLayer.name = name;
  svgLayer.rect = {
    origin: {
      x: 0,
      y: 0,
    },
    size: {
      width: layout.width,
      height: layout.height,
    },
  };
  return encodeSketchJSON(svgLayer);
}
