import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { PlatformBridge } from './types';
import { buildTree } from './buildTree';
import { flexToSketchJSON } from './flexToSketchJSON';
import * as React from 'react';

export const renderToJSON = (platformBridge: PlatformBridge) => async (
  element: React.ReactElement,
): Promise<FileFormat.AnyLayer> => {
  const tree = buildTree(platformBridge)(element);
  return flexToSketchJSON(platformBridge)(tree);
};
