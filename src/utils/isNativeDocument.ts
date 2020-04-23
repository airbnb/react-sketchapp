import { SketchDocumentData } from '../types';

export const isNativeDocument = (container: unknown): container is SketchDocumentData =>
  // @ts-ignore
  container && typeof container.pages === 'function';
