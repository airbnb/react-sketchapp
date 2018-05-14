/* @flow */
import type { SketchLayer } from '../types';

// NOTE: Must cast to string as page.name() returns a MSBoxedObject
const isNativeSymbolsPage = (layer: SketchLayer): boolean =>
  layer instanceof MSPage && String(layer.name()) === 'Symbols';

export default isNativeSymbolsPage;
