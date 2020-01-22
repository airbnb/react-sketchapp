import { PlatformBridge } from './types';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import * as React from 'react';

export default async function renderToJSON(
  element: React.ReactElement,
  platformBridge: PlatformBridge,
): Promise<FileFormat.AnyLayer> {
  const tree = buildTree(element, platformBridge);
  return flexToSketchJSON(tree, platformBridge);
}
