export const getDocumentFromContext = ctx =>
  ctx.document ||
  ctx.actionContext.document ||
  NSDocumentController.sharedDocumentController().currentDocument();

export const getDocumentFromContainer = (container: Object) => {
  if (!container) {
    return getDocumentFromContext(context);
  }

  return container.documentData().delegate();
};
