import { SketchPage } from '../types';

export default (container: unknown): container is SketchPage => container instanceof MSPage;
