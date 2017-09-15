import React from 'react';
import type { SJLayer } from 'sketchapp-json-flow-types';
import {
  appVersionSupported,
  fromSJSONDictionary,
} from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { resetDocument, resetPage } from './resets';

import type { SketchLayer, TreeNode } from './types';
import RedBox from './components/RedBox';

export const renderToJSON = (element: React$Element<any>): SJLayer => {
  const tree = buildTree(element);
  return flexToSketchJSON(tree);
};

export const renderLayers = (layers, container: SketchLayer): SketchLayer => {
  if (container.addLayers === undefined) {
    throw new Error(
      `
     React SketchApp cannot render into this layer. You may be trying to render into a layer
     that does not take children. Try rendering into a LayerGroup, Artboard, or Page.
    `
    );
  }

  container.addLayers(layers);
  return container;
};

export const renderToSketch = (
  node: TreeNode,
  container: SketchLayer
): SketchLayer => {
  const json = flexToSketchJSON(node);
  const layer = fromSJSONDictionary(json);

  return renderLayers([layer], container);
};

const findPageData = (
  current,
  depth,
  accumulated = []
): Array<{ type: string, children: Object, name?: string }> => {
  const children = current.children;
  for (let i = 0, len = children.length; i < len; i += 1) {
    const node = children[i];

    if (node.type === 'page') {
      accumulated.push({
        type: 'page',
        name: node.props.name,
        children: node.children,
      });
    }

    findPageData(children[i], depth + 1);
  }
  return accumulated;
};

const buildDocuments = (
  tree: TreeNode,
  context: Object
): ?SketchLayer | Array<?SketchLayer> => {
  const pageData = findPageData(tree, 0);

  if (pageData.length === 0) {
    return renderToSketch(tree, context.document.currentPage());
  }

  // Keep track of created pages
  // Starts at `1` because there is always one default page per document
  let pageTotal = 1;

  return pageData.forEach((data) => {
    // Get Document
    const document = context.document;
    let page = document.currentPage();

    if (pageTotal > 1) {
      // Create new page
      page = document.addBlankPage();
    } else {
      pageTotal += 1;
    }

    if (data.name) {
      // Name new page
      page.setName(data.name);
    }

    if (data.children && data.children.length > 0) {
      // Clear out page layers to prepare for re-render
      resetPage(page);
      data.children.forEach(child => renderToSketch(child, page));
    }

    return data.children;
  });
};

export const render = (
  element: React$Element<any>,
  context: Object
): ?SketchLayer | Array<?SketchLayer> => {
  if (appVersionSupported()) {
    if (!context) {
      throw new Error('No sketch "context" passed into render function.');
    }
    try {
      // Clear out document to prepare for re-render
      resetDocument(context);

      // Build out sketch compatible tree representation
      const tree = buildTree(element);

      // Traverse tree to create documents and pages, then render their children.
      return buildDocuments(tree, context);
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return renderToSketch(tree, context.document.currentPage());
    }
  }
  return null;
};
