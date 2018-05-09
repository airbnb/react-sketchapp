import React from 'react';
import type { SJLayer } from '@skpm/sketchapp-json-flow-types';
import { appVersionSupported, fromSJSONDictionary } from 'sketchapp-json-plugin';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { resetLayer, resetDocument } from './resets';
import { injectSymbols } from './symbol';

import type { SketchDocument, SketchLayer, SketchPage, TreeNode } from './types';
import RedBox from './components/RedBox';
import { getDocumentFromContainer, getDocumentFromContext } from './utils/getDocument';
import isNativeDocument from './utils/isNativeDocument';
import isNativeSymbolsPage from './utils/isNativeSymbolsPage';

export const renderToJSON = (element: React$Element<any>): SJLayer => {
  const tree = buildTree(element);
  return flexToSketchJSON(tree);
};

export const renderLayers = (layers, container: SketchLayer): SketchLayer => {
  if (container.addLayers === undefined) {
    throw new Error(`
     React SketchApp cannot render into this layer. You may be trying to render into a layer
     that does not take children. Try rendering into a LayerGroup, Artboard, or Page.
    `);
  }

  container.addLayers(layers);
  return container;
};

const getDefaultPage = (): SketchLayer => {
  const doc = getDocumentFromContext(context);
  const currentPage = doc.currentPage();

  return isNativeSymbolsPage(currentPage) ? doc.addBlankPage() : currentPage;
};

const renderContents = (tree: TreeNode, container: SketchLayer): SketchLayer => {
  const json = flexToSketchJSON(tree);
  const layer = fromSJSONDictionary(json);

  return renderLayers([layer], container);
};

const renderPage = (tree: TreeNode, page: SketchPage): Array<SketchLayer> => {
  // assume if name is set on this nested page, the intent is to overwrite
  // the name of the page it is getting rendered into
  if (tree.props.name) {
    page.setName(tree.props.name);
  }

  return tree.children.map(child => renderContents(child, page));
};

const renderDocument = (tree: TreeNode, doc: SketchDocument): Array<SketchLayer> => {
  if (!isNativeDocument(doc)) {
    throw new Error('Cannot render a Document into a child of Document');
  }

  const initialPage = doc.currentPage();
  const shouldRenderInitialPage = !isNativeSymbolsPage(initialPage);

  return tree.children.map((child, i) => {
    if (child.type !== 'page') {
      throw new Error('Document children must be of type Page');
    }

    const page = i === 0 && shouldRenderInitialPage ? initialPage : doc.addBlankPage();
    return renderPage(child, page);
  });
};

const renderTree = (tree: TreeNode, _container?: SketchLayer): SketchLayer | Array<SketchLayer> => {
  if (tree.type === 'document') {
    const doc = _container || getDocumentFromContext(context);

    resetDocument(doc);
    return renderDocument(tree, doc);
  }

  const container = _container || getDefaultPage();

  resetLayer(container);
  return tree.type === 'page' ? renderPage(tree, container) : renderContents(tree, container);
};

export const render = (
  element: React$Element<any>,
  container?: SketchLayer,
): SketchLayer | Array<SketchLayer> => {
  if (!appVersionSupported()) {
    return null;

    // The Symbols page holds a special meaning within Sketch / react-sketchapp
    // and due to how `makeSymbol` works, we cannot render into it
  } else if (isNativeSymbolsPage(container)) {
    throw Error('Cannot render into Symbols page');
  }

  try {
    const tree = buildTree(element);

    injectSymbols(
      container ? getDocumentFromContainer(container) : getDocumentFromContext(context),
    );

    return renderTree(tree, container);
  } catch (err) {
    const tree = buildTree(<RedBox error={err} />);
    return renderContents(tree, container);
  }
};
