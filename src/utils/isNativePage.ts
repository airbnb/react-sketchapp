import { SketchPage } from '../types';

export const isNativePage = (container: unknown): container is SketchPage =>
  container instanceof MSPage;
