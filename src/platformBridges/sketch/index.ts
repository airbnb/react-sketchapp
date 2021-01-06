import { PlatformBridge } from '../../types';
import { createStringMeasurer } from './createStringMeasurer';
import { findFontName } from './findFontName';
import readFile from './readFile';

const SketchBridge: PlatformBridge = {
  createStringMeasurer,
  findFontName,
  fetch,
  readFile,
};

export default SketchBridge;
