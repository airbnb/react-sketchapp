import { SketchDocumentData, SketchContext } from '../types';

export const getDocumentDataFromContext = (ctx: SketchContext): SketchDocumentData =>
  (
    ctx.document ||
    (ctx.actionContext || {}).document ||
    NSDocumentController.sharedDocumentController().currentDocument()
  ).documentData();

export const getDocumentDataFromContainer = (container?: any): SketchDocumentData => {
  if (!container) {
    return getDocumentDataFromContext(context);
  }

  return container.documentData();
};
