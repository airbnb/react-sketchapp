import { isNativePage } from './isNativePage';

// NOTE: Must cast to string as page.name() returns a MSBoxedObject
export const isNativeSymbolsPage = (layer: unknown): boolean =>
  isNativePage(layer) && String(layer.name()) === 'Symbols';
