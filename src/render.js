import React from 'react';
import type { SJLayer } from 'sketchapp-json-flow-types';
import {
  appVersionSupported,
  fromSJSONDictionary,
} from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';

import type { SketchLayer, TreeNode } from './types';
import RedBox from './components/RedBox';

export const renderToJSON = (element: React$Element<any>): SJLayer => {
  const tree = buildTree(element);
  return flexToSketchJSON(tree);
};

const renderToSketch = (
  node: TreeNode,
  container: SketchLayer
): SketchLayer => {
  // old render method for < Sketch 44 API
  const supportsOlderRender =
    container.replaceAllLayersWithLayers !== undefined;
  // new render method for Sketch 45+ API
  const isLayerGroup = container.insertLayer_afterLayerOrAtEnd !== undefined;

  const json = flexToSketchJSON(node);
  const layer = fromSJSONDictionary(json);
  if (isLayerGroup) {
    container.insertLayer_afterLayerOrAtEnd(layer, null);
  } else if (supportsOlderRender) {
    container.replaceAllLayersWithLayers([layer]);
  } else {
    throw new Error(`
      React SketchApp cannot render into this layer. You may be trying to render into a layer
      that does not take children. Try rendering into a LayerGroup, Artboard, or Page.
     `);
  }
  return container;
};

export const render = (
  element: React$Element<any>,
  container: SketchLayer
): ?SketchLayer => {
  if (appVersionSupported()) {
    try {
      const tree = buildTree(element);
      return renderToSketch(tree, container);
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return renderToSketch(tree, container);
    }
  }
  return null;
};
