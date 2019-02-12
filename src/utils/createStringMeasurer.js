// @flow
import type { TextNodes, Size } from '../types';
import getSketchVersion from './getSketchVersion';
import sketchMethod from '../jsonUtils/sketchImpl/createStringMeasurer';
import nodeMethod from '../jsonUtils/nodeImpl/createStringMeasurer';

const createStringMeasurer = (textNodes: TextNodes) => (width: number = 0): Size => {
  // width would be obj-c NaN and the only way to check for it is by comparing
  // width to itself (because NaN !== NaN)
  // eslint-disable-next-line no-self-compare
  const _width = width !== width ? 0 : width;

  if (textNodes.length > 0) {
    if (getSketchVersion() === 'NodeJS') {
      return nodeMethod(textNodes, _width);
    }
    return sketchMethod(textNodes, _width);
  }

  return { width: _width, height: 0 };
};

export default createStringMeasurer;
