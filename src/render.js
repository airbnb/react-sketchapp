import React from 'react';
import type { SJLayer } from 'sketchapp-json-flow-types';
import { appVersionSupported, fromSJSONDictionary } from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { timeFunction } from './debug';

import type { SketchLayer, TreeNode } from './types';
import RedBox from './components/RedBox';

export const renderToJSON = (element: React$Element<any>): SJLayer => {
  const tree = timeFunction(() => buildTree(element), 'build tree');
  return flexToSketchJSON(tree);
};

const renderToSketch = (node: TreeNode, container: SketchLayer): SketchLayer => {
  const json = flexToSketchJSON(node);
  const layer = fromSJSONDictionary(json);
  container.replaceAllLayersWithLayers([layer]);
  return container;
};

export const render = (element: React$Element<any>, container: SketchLayer): ?SketchLayer => {
  if (appVersionSupported()) {
    try {
      const tree = timeFunction(() => buildTree(element), 'build tree');
      return timeFunction(() => renderToSketch(tree, container), 'new renderer');
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return timeFunction(() => renderToSketch(tree, container), 'new renderer');
    }
  }
  return null;
};
