// @flow
import type { SketchDocumentData } from '../types';

export const getDocumentFromContext = (ctx: context): SketchDocumentData =>
  (
    ctx.document ||
    (ctx.actionContext || {}).document ||
    NSDocumentController.sharedDocumentController().currentDocument()
  ).documentData();

export const getDocumentFromContainer = (container?: Object): SketchDocumentData => {
  if (!container) {
    return getDocumentFromContext(context);
  }

  return container.documentData();
};
