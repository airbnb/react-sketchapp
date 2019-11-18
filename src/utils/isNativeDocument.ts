import { SketchDocumentData } from '../types';

export default (container: unknown): container is SketchDocumentData =>
  // @ts-ignore
  container && typeof container.pages === 'function';
