// @flow
import type { SketchDocumentData } from '../types';

export const getDocumentDataFromContext = (ctx: context): SketchDocumentData =>
  (
    ctx.document ||
    (ctx.actionContext || {}).document ||
    NSDocumentController.sharedDocumentController().currentDocument()
  ).documentData();

export const getDocumentDataFromContainer = (container?: Object): SketchDocumentData => {
  if (!container) {
    return getDocumentDataFromContext(context);
  }

  return container.documentData();
};
