// @flow
import isNativePage from './isNativePage';

// NOTE: Must cast to string as page.name() returns a MSBoxedObject
const isNativeSymbolsPage = (layer: any): boolean =>
  isNativePage(layer) && String(layer.name()) === 'Symbols';

export default isNativeSymbolsPage;
