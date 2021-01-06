import { render as _render } from './render';
import { renderToJSON as _renderToJSON } from './renderToJSON';
import { makeSymbol as _makeSymbol, SymbolMasterProps } from './symbol';
import {
  SketchLayer,
  WrappedSketchLayer,
  SketchDocumentData,
  WrappedSketchDocument,
  SketchDocument,
  PlatformBridge,
} from './types';
import { TextStyles as _TextStyles } from './sharedStyles/TextStyles';
import SketchBridge from './platformBridges/sketch';

export function render(
  element: React.ReactElement,
  container?: SketchLayer | WrappedSketchLayer,
  platformBridge: PlatformBridge = SketchBridge,
) {
  return _render(platformBridge)(element, container);
}

export function renderToJSON(
  element: React.ReactElement,
  platformBridge: PlatformBridge = SketchBridge,
) {
  return _renderToJSON(platformBridge)(element);
}

export function makeSymbol(
  Component: React.ComponentType<any>,
  symbolProps: string | SymbolMasterProps,
  document: SketchDocumentData | SketchDocument | WrappedSketchDocument | undefined,
  bridge: PlatformBridge = SketchBridge,
) {
  return _makeSymbol(bridge)(Component, symbolProps, document);
}

export const TextStyles = _TextStyles(() => SketchBridge);
