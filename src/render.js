import React from 'react';
import { appVersionSupported, fromSJSONDictionary } from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './renderViaJSON';
import { timeFunction } from './debug';

import type { SketchContext, SketchLayer, TreeNode } from './types';
import RedBox from './components/RedBox';

const renderToSketchViaJSON = (node: TreeNode, page: SketchLayer): SketchLayer => {
  const json = flexToSketchJSON(node);
  // const str = NSString.stringWithString_(JSON.stringify(json));
  // log(str);
  // timeFunction(() => {
  //   const file = NSString.stringWithString_('~/Desktop/sketchtest.json')
  //     .stringByExpandingTildeInPath();
  //   str.writeToFile_atomically_(file, false);
  // }, 'writeToFile_atomically_');
  const layer = fromSJSONDictionary(json);
  page.addLayers([layer]);
  return page;
};

function render(element: React$Element<any>, context: SketchContext): ?SketchLayer {
  const page: SketchLayer = context.document.currentPage();
  if (appVersionSupported()) {
    try {
      const tree = timeFunction(() => buildTree(element), 'build tree');
      return timeFunction(() => renderToSketchViaJSON(tree, page), 'new renderer');
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return timeFunction(() => renderToSketchViaJSON(tree, page), 'new renderer');
    }
  }
  return context.document.showMessage('💎 Requires Sketch 43+ 💎');
}

module.exports = render;
