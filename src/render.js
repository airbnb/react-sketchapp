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

export const replaceAllLayersWithLayers = (
  layers,
  container: SketchLayer
): SketchLayer => {
  if (container.addLayers === undefined) {
    throw new Error(
      `
     React SketchApp cannot render into this layer. You may be trying to render into a layer
     that does not take children. Try rendering into a LayerGroup, Artboard, or Page.
    `
    );
  }

  if (container.containsLayers()) {
    const loop = container.children().objectEnumerator();
    let currLayer = loop.nextObject();
    while (currLayer) {
      if (currLayer !== container) {
        currLayer.removeFromParent();
      }
      currLayer = loop.nextObject();
    }
  }

  container.addLayers(layers);
  return container;
};

const renderToSketch = (
  node: TreeNode,
  container: SketchLayer
): SketchLayer => {
  const json = flexToSketchJSON(node);
  const layer = fromSJSONDictionary(json);

  return replaceAllLayersWithLayers([layer], container);
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
