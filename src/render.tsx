import * as React from 'react';
import convertJsonToSketch from './jsonUtils/sketchJson/convertJsonToSketch';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { resetLayer, resetDocument } from './resets';
import { injectSymbols } from './symbol';
import {
  SketchDocumentData,
  SketchLayer,
  SketchPage,
  TreeNode,
  WrappedSketchLayer,
  PlatformBridge,
} from './types';
import RedBox from './components/RedBox';
import { getDocumentDataFromContainer, getDocumentDataFromContext } from './utils/getDocument';
import isNativeDocument from './utils/isNativeDocument';
import isNativePage from './utils/isNativePage';
import isNativeSymbolsPage from './utils/isNativeSymbolsPage';
import getDefaultBridge from './platformBridges/getDefaultBridge';

export const renderLayers = (layers: Array<any>, container: SketchLayer): SketchLayer => {
  if (container.addLayers === undefined) {
    throw new Error(
      ` React SketchApp cannot render into this layer. You may be trying to render into a layer that does not take children. Try rendering into a LayerGroup, Artboard, or Page.`,
    );
  }

  container.addLayers(layers);
  return container;
};

const getDefaultPage = (): SketchLayer => {
  const doc = getDocumentDataFromContext(context);
  const currentPage = doc.currentPage();

  return isNativeSymbolsPage(currentPage) ? doc.addBlankPage() : currentPage;
};

const renderContents = async (
  tree: TreeNode | string,
  container: SketchLayer,
  bridge: PlatformBridge,
): Promise<SketchLayer> => {
  const json = await flexToSketchJSON(tree, bridge);
  const layer = convertJsonToSketch(json, '119');

  return renderLayers([layer], container);
};

const renderPage = async (
  tree: TreeNode,
  page: SketchPage,
  bridge: PlatformBridge,
): Promise<Array<SketchLayer>> => {
  const children = tree.children || [];

  // assume if name is set on this nested page, the intent is to overwrite
  // the name of the page it is getting rendered into
  if (tree.props.name) {
    page.setName(tree.props.name);
  }

  return Promise.all(children.map(child => renderContents(child, page, bridge)));
};

const renderDocument = async (
  tree: TreeNode,
  documentData: SketchDocumentData,
  bridge: PlatformBridge,
): Promise<Array<SketchLayer>> => {
  if (!isNativeDocument(documentData)) {
    throw new Error('Cannot render a Document into a child of Document');
  }

  const initialPage = documentData.currentPage();
  const shouldRenderInitialPage = !isNativeSymbolsPage(initialPage);
  const children = tree.children || [];

  return children.map((child, i) => {
    if (typeof child === 'string' || child.type !== 'sketch_page') {
      throw new Error('Document children must be of type Page');
    }

    const page = i === 0 && shouldRenderInitialPage ? initialPage : documentData.addBlankPage();
    return renderPage(child, page, bridge);
  });
};

const renderTree = async (
  tree: TreeNode,
  _container: SketchLayer | null | undefined,
  bridge: PlatformBridge,
): Promise<SketchLayer | Array<SketchLayer>> => {
  if (isNativeDocument(_container) && tree.type !== 'sketch_document') {
    throw new Error('You need to render a Document into Document');
  }

  if (!isNativePage(_container) && tree.type === 'sketch_page') {
    throw new Error('You need to render a Page into Page');
  }

  if (tree.type === 'sketch_document') {
    const doc = _container || getDocumentDataFromContext(context);

    resetDocument(doc);
    return renderDocument(tree, doc, bridge);
  }

  const container = _container || getDefaultPage();

  resetLayer(container);
  return tree.type === 'sketch_page'
    ? renderPage(tree, container, bridge)
    : renderContents(tree, container, bridge);
};

export default async function render(
  element: React.ReactElement,
  container?: SketchLayer | WrappedSketchLayer,
  platformBridge: PlatformBridge = getDefaultBridge(),
): Promise<SketchLayer | Array<SketchLayer>> {
  let nativeContainer: SketchLayer | void;
  if (container && container.sketchObject) {
    nativeContainer = container.sketchObject;
  } else if (container) {
    nativeContainer = container;
  }

  // The Symbols page holds a special meaning within Sketch / react-sketchapp
  // and due to how `makeSymbol` works, we cannot render into it
  if (isNativeSymbolsPage(nativeContainer)) {
    throw Error('Cannot render into Symbols page');
  }

  try {
    const tree = buildTree(element, platformBridge);

    injectSymbols(getDocumentDataFromContainer(nativeContainer));

    const layer = await renderTree(tree, nativeContainer, platformBridge);
    return layer;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production')
      // eslint-disable-next-line no-console
      console.error(err);
    const tree = buildTree(<RedBox error={err} />, platformBridge);
    return renderContents(tree, nativeContainer, platformBridge);
  }
}
