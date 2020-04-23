import { PlatformBridge } from '../types';

import { createStringMeasurer, findFontName, makeImageDataFromUrl } from 'node-sketch-bridge';

const NodeMacOSBridge: PlatformBridge = {
  createStringMeasurer,
  findFontName,
  makeImageDataFromUrl,
};

export default NodeMacOSBridge;
