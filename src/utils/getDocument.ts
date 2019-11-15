import { SketchDocumentData, SketchContext, SketchDocument, WrappedSketchDocument } from '../types';

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

export const getDocumentData = (
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): SketchDocumentData | undefined => {
  let nativeDocument: SketchDocumentData | SketchDocument;
  let nativeDocumentData: SketchDocumentData;

  if (!document) {
    nativeDocument = getDocumentDataFromContext(context);
  } else if ('sketchObject' in document) {
    nativeDocument = document.sketchObject;
  } else {
    nativeDocument = document;
  }

  if (nativeDocument) {
    return undefined;
  }

  if ('documentData' in nativeDocument) {
    nativeDocumentData = nativeDocument.documentData();
  } else {
    nativeDocumentData = nativeDocument;
  }

  return nativeDocumentData;
};
