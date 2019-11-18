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

export const getDocument = (
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): SketchDocument | undefined => {
  const documentData = getDocumentData(document);
  if (typeof documentData === 'undefined' || !('delegate' in documentData)) {
    return documentData;
  }

  return documentData.delegate();
};

export const getDocumentData = (
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): SketchDocumentData | undefined => {
  let nativeDocument: SketchDocumentData | SketchDocument | undefined;
  let nativeDocumentData: SketchDocumentData;

  if (!document && typeof context !== 'undefined') {
    nativeDocument = getDocumentDataFromContext(context);
  } else if (typeof document !== 'undefined' && 'sketchObject' in document) {
    nativeDocument = document.sketchObject;
  } else {
    nativeDocument = document;
  }

  if (!nativeDocument) {
    return undefined;
  }

  if ('documentData' in nativeDocument) {
    nativeDocumentData = nativeDocument.documentData();
  } else {
    nativeDocumentData = nativeDocument;
  }

  return nativeDocumentData;
};
