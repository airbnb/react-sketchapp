/* @flow */
// We need native macOS fonts and colors for these hacks so import the old utils
import type { SJTextStyle } from 'sketchapp-json-flow-types';
import { TextAlignment } from 'sketch-constants';
import { toSJSON } from 'sketchapp-json-plugin';
import findFont from '../utils/findFont';
import type { TextStyle } from '../types';
import { generateID, makeColorFromCSS } from './models';

export const TEXT_ALIGN = {
  auto: TextAlignment.Left,
  left: TextAlignment.Left,
  right: TextAlignment.Right,
  center: TextAlignment.Center,
  justify: TextAlignment.Justified,
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

// NOTE(gold): toSJSON doesn't recursively parse JS objects
// https://github.com/airbnb/react-sketchapp/pull/73#discussion_r108529703
function encodeSketchJSON(sketchObj) {
  const encoded = toSJSON(sketchObj);
  return JSON.parse(encoded);
}

function makeParagraphStyle(textStyle) {
  const pStyle = NSMutableParagraphStyle.alloc().init();
  if (textStyle.lineHeight !== undefined) {
    pStyle.minimumLineHeight = textStyle.lineHeight;
    pStyle.maximumLineHeight = textStyle.lineHeight;
  }

  if (textStyle.textAlign) {
    pStyle.alignment = TEXT_ALIGN[textStyle.textAlign];
  }

  return pStyle;
}

export const makeImageDataFromUrl = (url: string): MSImageData => {
  const imageData = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(url));

  return MSImageData.alloc().initWithImage_convertColorSpace(imageData, false);
};

// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
export function makeAttributedString(string: ?string, textStyle: TextStyle) {
  const font = findFont(textStyle);

  const color = makeColorFromCSS(textStyle.color || 'black');

  const attribs: Object = {
    MSAttributedStringFontAttribute: font.fontDescriptor(),
    NSParagraphStyle: makeParagraphStyle(textStyle),
    NSColor: NSColor.colorWithDeviceRed_green_blue_alpha(
      color.red,
      color.green,
      color.blue,
      color.alpha,
    ),
  };

  if (textStyle.letterSpacing !== undefined) {
    attribs.NSKern = textStyle.letterSpacing;
  }

  if (textStyle.textTransform !== undefined) {
    attribs.MSAttributedStringTextTransformAttribute = TEXT_TRANSFORM[textStyle.textTransform] * 1;
  }

  const attribStr = NSAttributedString.attributedStringWithString_attributes_(string, attribs);
  const msAttribStr = MSAttributedString.alloc().initWithAttributedString(attribStr);

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
      MSAttributedStringTextTransformAttribute: TEXT_TRANSFORM[
        textStyle.textTransform || 'initial'
      ] * 1,
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
