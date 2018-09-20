// @flow
import type { TextNodes, Size } from '../types';
import getSketchVersion from './getSketchVersion';
import { createAttributedString } from '../jsonUtils/hacksForJSONImpl';
import { createNodeJSStringMeasurer } from '../jsonUtils/hacksForNodObjCImpl';

// TODO(lmr): do something more sensible here
const FLOAT_MAX = 999999;

const createStringMeasurer = (textNodes: TextNodes) => (width: number = 0): Size => {
  // width would be obj-c NaN and the only way to check for it is by comparing
  // width to itself (because NaN !== NaN)
  // eslint-disable-next-line no-self-compare
  const _width = width !== width ? 0 : width;
  let newHeight = 0;
  let newWidth = _width;

  if (textNodes.length > 0) {
    // if we are running in node
    if (getSketchVersion() === 'NodeJS') {
      return createNodeJSStringMeasurer(textNodes, _width);
    }
    const fullStr = NSMutableAttributedString.alloc().init();
    textNodes.forEach(textNode => {
      const newString = createAttributedString(textNode);
      fullStr.appendAttributedString(newString);
    });
    const {
      height: measureHeight,
      width: measureWidth,
    } = fullStr.boundingRectWithSize_options_context(
      CGSizeMake(_width, FLOAT_MAX),
      NSStringDrawingUsesLineFragmentOrigin,
      null,
    ).size;
    newHeight = measureHeight;
    newWidth = measureWidth;
  }

  return { width: newWidth, height: newHeight };
};

export default createStringMeasurer;
