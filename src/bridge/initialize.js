/* @flow */

const initialize = (context: any): any => {
  const doc = context.document;
  const page = doc.currentPage();
  const artboard = page.currentArtboard();
  const selection = context.selection;

  return { doc, page, artboard, selection };
};

export default initialize;
