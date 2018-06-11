// @flow
import type { SketchDocumentData } from './types';
import isNativeDocument from './utils/isNativeDocument';
import isNativeSymbolsPage from './utils/isNativeSymbolsPage';

export const resetLayer = (container: Object) => {
  if (isNativeDocument(container)) {
    resetDocument(container); // eslint-disable-line
    return;
  }
  const layers = container.children();
  // Skip last child since it is the container itself
  for (let l = 0; l < layers.count() - 1; l += 1) {
    const layer = layers.objectAtIndex(l);
    layer.removeFromParent();
  }
};

// Clear out all document pages and layers
export const resetDocument = (documentData: SketchDocumentData) => {
  // Get Pages and delete them all (Except Symbols Page)
  const pages = documentData.pages();
  for (let index = pages.length - 1; index >= 0; index -= 1) {
    const page = pages[index];
    // Don't delete symbols page
    if (!isNativeSymbolsPage(page)) {
      if (pages.length > 1) {
        documentData.removePageAtIndex(index);
      } else {
        resetLayer(page);
      }
    }
  }
};
