// @flow

// Clear out all page layers
export const resetPage = (page: Object) => {
  // Can't delete the last page. Remove all layers instead
  const layers = page.children();
  for (let l = 0; l < layers.count(); l += 1) {
    const layer = layers.objectAtIndex(l);
    layer.removeFromParent();
  }
};

// Clear out all document pages and layers
export const resetDocument = () => {
  // Get Pages and delete them all (Except Symbols Page)
  const pages = context.document.pages();
  for (let index = pages.length - 1; index >= 0; index -= 1) {
    const page = pages[index];
    // Don't delete symbols page
    // NOTE: Must use != instead of !== due to page.name() being a MSBoxedObject
    // eslint-disable-next-line
    if (page.name() != "Symbols") {
      if (pages.length > 1) {
        context.document.documentData().removePageAtIndex(index);
      } else {
        resetPage(pages[index]);
      }
    }
  }
};
