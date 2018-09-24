// @flow
// We need native macOS fonts and colors for these hacks so import the old utils
import { toSJSON } from '@skpm/sketchapp-json-plugin';
import {
  TEXT_ALIGN,
  TEXT_DECORATION_UNDERLINE,
  TEXT_DECORATION_LINETHROUGH,
  TEXT_TRANSFORM,
} from '../utils/constants';
import findFont from '../utils/findFont';
import getSketchVersion from '../utils/getSketchVersion';
import type { TextNodes, TextNode, TextStyle, LayoutInfo } from '../types';
import { makeColorFromCSS } from './models';

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

  // TODO: check against only positive spacing values?
  if (textStyle.paragraphSpacing !== undefined) {
    pStyle.paragraphSpacing = textStyle.paragraphSpacing;
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
  const sketchVersion = getSketchVersion();
  if (sketchVersion === 'NodeJS' || sketchVersion >= 50) {
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

  textNodes.forEach(textNode => {
    const newString = createAttributedString(textNode);
    fullStr.appendAttributedString(newString);
  });

  const encodedAttribStr = MSAttributedString.encodeAttributedString(fullStr);

  const msAttribStr = MSAttributedString.alloc().initWithEncodedAttributedString(encodedAttribStr);
  return encodeSketchJSON(msAttribStr);
}

export function makeEncodedTextStyleAttributes(textStyle: TextStyle) {
  const pStyle = makeParagraphStyle(textStyle);

  const font = findFont(textStyle);

  const color = makeColorFromCSS(textStyle.color || 'black');

  return {
    MSAttributedStringFontAttribute: encodeSketchJSON(font.fontDescriptor()),
    NSFont: font,
    NSColor: encodeSketchJSON(
      NSColor.colorWithDeviceRed_green_blue_alpha(color.red, color.green, color.blue, color.alpha),
    ),
    NSParagraphStyle: encodeSketchJSON(pStyle),
    NSKern: textStyle.letterSpacing || 0,
    MSAttributedStringTextTransformAttribute:
      TEXT_TRANSFORM[textStyle.textTransform || 'initial'] * 1,
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
