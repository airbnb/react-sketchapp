// @flow

// Clear out all document pages and layers
export const resetDocument = (context: Object) => {
  // Get Document
  const document = context.document;

  // Get Pages and delete them all
  const pages = context.document.pages();
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
};

// Clear out all page layers
export const resetPage = (page: Object) => {
  // Can't delete the last page. Remove all layers instead
  const layers = page.children();
  for (let l = 0; l < layers.count(); l += 1) {
    const layer = layers.objectAtIndex(l);
    layer.removeFromParent();
  }
};
