import React from 'react';
import type { SJLayer } from 'sketchapp-json-flow-types';
import { appVersionSupported, fromSJSONDictionary } from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { timeFunction } from './debug';

import type { SketchContext, SketchLayer, TreeNode } from './types';
import RedBox from './components/RedBox';

export const renderToJSON = (element: React$Element<any>): SJLayer => {
  const tree = timeFunction(() => buildTree(element), 'build tree');
  return flexToSketchJSON(tree);
};

const renderToSketch = (node: TreeNode, page: SketchLayer): SketchLayer => {
  const json = flexToSketchJSON(node);
  const layer = fromSJSONDictionary(json);
  page.replaceAllLayersWithLayers([layer]);
  return page;
};

export const render = (element: React$Element<any>, context: SketchContext): ?SketchLayer => {
  const page: SketchLayer = context.document.currentPage();
  if (appVersionSupported()) {
    try {
      const tree = timeFunction(() => buildTree(element), 'build tree');
      return timeFunction(() => renderToSketch(tree, page), 'new renderer');
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return timeFunction(() => renderToSketch(tree, page), 'new renderer');
    }
  }
  return context.document.showMessage('💎 Requires Sketch 43+ 💎');
};
