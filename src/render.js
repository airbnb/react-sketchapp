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

function createPages(tree: TreeNode): ?Array<Object> {
  if (tree.type === 'document' && tree.children) {
    const childrenArePages = tree.children.filter(
      child => child.type === 'page'
    );
    if (childrenArePages) {
      // Get Document
      const document = tree.props.context.document;

      // Get Pages and delete them all
      const pages = tree.props.context.document.pages();
      for (let index = pages.length - 1; index >= 0; index -= 1) {
        if (pages.length > 1) {
          document.documentData().removePageAtIndex(index);
        } else {
          // Can't delete the last page. Remove all layers instead
          const layers = pages[index].children();
          for (let l = 0; l < layers.count(); l += 1) {
            const layer = layers.objectAtIndex(l);
            layer.removeFromParent();
          }
        }
      }

      if (tree.children.length > 1) {
        return tree.children.forEach((child, index) => {
          if (index === 0) {
            return;
          }
          if (child.props.name) {
            // Create new page
            const newPage = document.addBlankPage();
            renderToSketch(child.children[0], newPage);
            if (child.props.name) {
              // Name new page
              newPage.setName(child.props.name);
            }
          }
        });
      }
      const child = tree.children[0];
      document.currentPage().setName(child.props.name);
      return renderToSketch(child.children[0], document.currentPage());
    }
    // eslint-disable-next-line
    console.error("All children of <Document> components MUST be <Pages>.");
    return null;
  }
  // eslint-disable-next-line
  console.error("No <Document> component found at root.");
  return null;
}

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
      createPages(tree);

      // return renderToSketch(tree, container);
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return renderToSketch(tree, container);
    }
  }
  return null;
};
