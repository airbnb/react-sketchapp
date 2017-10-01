/* @flow */
import type { TextNode, TextNodes, Size } from '../types';
import findFont from './findFont';

// TODO(lmr): do something more sensible here
const FLOAT_MAX = 999999;

const measureString = (textNode: TextNode) => {
  const { content, textStyles } = textNode;

  const font = findFont(textStyles);

  const attributes = {
    [NSFontAttributeName]: font,
  };

  if (textStyles.lineHeight !== undefined) {
    // NOTE(gold): Visual explanation of NSParagraphStyle
    // https://medium.com/@at_underscore/nsparagraphstyle-explained-visually-a8659d1fbd6f
    const paragraphStyle = NSMutableParagraphStyle.alloc().init();
    paragraphStyle.minimumLineHeight = textStyles.lineHeight;
    paragraphStyle.lineHeightMultiple = 1.0;
    paragraphStyle.maximumLineHeight = textStyles.lineHeight;
    attributes[NSParagraphStyleAttributeName] = paragraphStyle;
  }

  if (textStyles.letterSpacing !== undefined) {
    attributes[NSKernAttributeName] = textStyles.letterSpacing;
  }

  const rect = NSString.alloc()
    .initWithString(content)
    .boundingRectWithSize_options_attributes_context(
      CGSizeMake(0, FLOAT_MAX),
      NSStringDrawingUsesLineFragmentOrigin,
      attributes,
      null
    );

  // TODO(lmr): handle other widthModes, and height/heightModes

  return {
    width: 0 + rect.size.width,
    height: 0 + rect.size.height,
  };
};

const createStringMeasurer = (textNodes: TextNodes) => (
  width: number
): Size => {
  let newHeight = 0;
  let newWidth = 0;

  if (textNodes.length > 0) {
    const measurements = textNodes.map(textNode =>
      measureString(textNode, width)
    );
    measurements.forEach((measure) => {
      const { height: measureHeight, width: measureWidth } = measure;
      // Add up all measured widths
      newWidth += Math.ceil(measureWidth);
      // Find the largest measured height
      if (measureHeight > newHeight) {
        newHeight = measureHeight;
      }
    });
    // Calculate height based on number of line wraps
    newHeight *= Math.ceil(newWidth / width);
  }

  return { width: newWidth, height: newHeight };
};

module.exports = createStringMeasurer;
