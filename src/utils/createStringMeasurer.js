/* @flow */
import { TextStyle, Size } from '../types';
import findFont from './findFont';

// TODO(lmr): do something more sensible here
const FLOAT_MAX = 999999;

const createStringMeasurer = (string: string, style: TextStyle) =>
  (
    width: number,
    // widthMode: MeasureMode
    // height: number,
    // heightMode: MeasureMode
  ): Size => {
    const font = findFont(style);
    const attributes = {
      [NSFontAttributeName]: font,
    };

    if (style.lineHeight !== undefined) {
      // NOTE(gold): Visual explanation of NSParagraphStyle
      // https://medium.com/@at_underscore/nsparagraphstyle-explained-visually-a8659d1fbd6f
      const paragraphStyle = NSMutableParagraphStyle.alloc().init();
      paragraphStyle.minimumLineHeight = style.lineHeight;
      paragraphStyle.lineHeightMultiple = 1.0;
      paragraphStyle.maximumLineHeight = style.lineHeight;
      attributes[NSParagraphStyleAttributeName] = paragraphStyle;
    }

    if (style.letterSpacing !== undefined) {
      attributes[NSKernAttributeName] = style.letterSpacing;
    }

    const rect = NSString.alloc()
      .initWithString(string)
      .boundingRectWithSize_options_attributes_context(
        CGSizeMake(width, FLOAT_MAX),
        NSStringDrawingUsesLineFragmentOrigin,
        attributes,
        null,
      );

    // TODO(lmr): handle other widthModes, and height/heightModes

    return {
      width: 0 + rect.size.width,
      height: 0 + rect.size.height,
    };
  };

module.exports = createStringMeasurer;
