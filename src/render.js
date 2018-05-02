import React from 'react';
import type { SJLayer } from 'sketchapp-json-flow-types';
import {
  appVersionSupported,
  fromSJSONDictionary,
} from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { resetLayer, resetDocument } from './resets';
import { getSymbolsPage, injectSymbols } from './symbol';

import type { SketchLayer, TreeNode } from './types';
import RedBox from './components/RedBox';
import {
  getDocumentFromContainer,
  getDocumentFromContext,
} from './utils/getDocument';

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

const renderToSketch = (
  node: TreeNode,
  container: SketchLayer
): SketchLayer => {
  const json = flexToSketchJSON(node);
  const layer = fromSJSONDictionary(json);

  return renderLayers([layer], container);
};

// Crawl tree data to find all <Page> components
const findPageData = (
  current,
  depth = 0,
  accumulated = []
): Array<{ type: string, children: Object, name?: string }> => {
  const children = current.children || [];
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

const buildPages = (
  tree: TreeNode,
  container: ?SketchLayer
): ?SketchLayer | Array<?SketchLayer> => {
  const document = getDocumentFromContainer(container);
  const pageData = findPageData(tree);
  const symbolPage = getSymbolsPage(document);
  injectSymbols(document);

  if (pageData.length === 0) {
    const _container = container || document.currentPage();
    const page =
      !symbolPage || _container !== symbolPage
        ? _container
        : document.addBlankPage();

    return renderToSketch(tree, page);
  }

  // Keep track of created pages
  // Starts at `1` by default, because there is always one default page per document
  let pageTotal = symbolPage ? 2 : 1;
  // Keep track of existing and created pages to pass back to function caller
  const pages = [];

  pageData.forEach((data) => {
    // Get Current Page
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
      resetLayer(page);
      data.children.forEach((child) => {
        renderToSketch(child, page);
      });
    }

    pages.push(page);
  });

  return pages;
};

export const render = (
  element: React$Element<any>,
  container?: ?SketchLayer
): ?SketchLayer | Array<?SketchLayer> => {
  if (appVersionSupported()) {
    try {
      // Clear out document or layer to prepare for re-render
      if (!container) {
        resetDocument(getDocumentFromContext(context));
      } else {
        resetLayer(container);
      }

      // Build out sketch compatible tree representation
      const tree = buildTree(element);

      // Traverse tree to create pages and render their children.
      return buildPages(tree, container);
    } catch (err) {
      const tree = buildTree(<RedBox error={err} />);
      return renderToSketch(
        tree,
        getDocumentFromContext(context).currentPage()
      );
    }
  }
  return null;
};
