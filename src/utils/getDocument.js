export default ctx =>
  ctx.document ||
  ctx.actionContext.document ||
  NSDocumentController.sharedDocumentController().currentDocument() ||
  MSDocument.currentDocument();
