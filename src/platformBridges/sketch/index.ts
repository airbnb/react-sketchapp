import { PlatformBridge } from '../../types';
import { createStringMeasurer } from './createStringMeasurer';
import { findFontName } from './findFontName';
import { makeImageDataFromUrl } from './makeImageDataFromUrl';

const SketchBridge: PlatformBridge = {
  createStringMeasurer,
  findFontName,
  makeImageDataFromUrl,
};

export default SketchBridge;
