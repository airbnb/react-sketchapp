import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { fromSJSON } from './jsonUtils/sketchJson/fromSJSON';
import { toSJSON } from './jsonUtils/sketchJson/toSJSON';
import { StyleSheet } from './stylesheet';
import { generateID } from './jsonUtils/models';
import { ViewStylePropTypes } from './components/ViewStylePropTypes';
import { ResizingConstraintPropTypes } from './components/ResizingConstraintPropTypes';
import { buildTree } from './buildTree';
import { flexToSketchJSON } from './flexToSketchJSON';
import { renderLayers } from './render';
import { resetLayer } from './resets';
import { getDocumentData } from './utils/getDocument';
import { SketchDocumentData, SketchDocument, WrappedSketchDocument, PlatformBridge } from './types';
import { getSketchVersion } from './utils/getSketchVersion';

let id = 0;
const nextId = () => ++id;

const displayName = (Component: React.ComponentType<any>): string =>
  Component.displayName || Component.name || `UnknownSymbol${nextId()}`;

let hasInitialized = false;
const symbolsRegistry: { [name: string]: FileFormat.SymbolMaster } = {};
let existingSymbols: FileFormat.SymbolMaster[] = [];
const layers: { [symbolID: string]: any } = {};

function msListToArray<T>(pageList: T[]): T[] {
  const out = [];
  for (let i = 0; i < pageList.length; i++) {
    out.push(pageList[i]);
  }
  return out;
}

const getSymbolsPage = (documentData: SketchDocumentData) =>
  documentData.symbolsPageOrCreateIfNecessary();

function exists(x: FileFormat.SymbolMaster | undefined | null): x is FileFormat.SymbolMaster {
  return !!x;
}

const getExistingSymbols = (documentData: SketchDocumentData) => {
  if (!hasInitialized) {
    hasInitialized = true;

    const symbolsPage = getSymbolsPage(documentData);

    existingSymbols = msListToArray(symbolsPage.layers())
      .map((x) => {
        const symbolJson = toSJSON(x);
        if (!symbolJson || symbolJson._class !== 'symbolMaster') {
          return undefined;
        }
        layers[symbolJson.symbolID] = x;
        return symbolJson;
      })
      .filter(exists);

    existingSymbols.forEach((symbolMaster) => {
      if (symbolMaster._class !== 'symbolMaster') return;
      if (symbolMaster.name in symbolsRegistry) return;
      symbolsRegistry[symbolMaster.name] = symbolMaster;
    });
  }
  return existingSymbols;
};

export const injectSymbols = (
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
) => {
  if (getSketchVersion() === 'NodeJS') {
    console.error('Cannot inject symbols in NodeJS');
    return;
  }

  // if hasInitialized is false then makeSymbol has not yet been called
  // so we don't have anything to inject
  if (hasInitialized) {
    const documentData = getDocumentData(document);

    if (!documentData) {
      return;
    }

    const currentPage = documentData.currentPage();

    const symbolsPage = getSymbolsPage(documentData);

    let left = 0;
    Object.keys(symbolsRegistry).forEach((key) => {
      const symbolMaster = symbolsRegistry[key];
      symbolMaster.frame.y = 0;
      symbolMaster.frame.x = left;
      left += symbolMaster.frame.width + 20;

      const newLayer = fromSJSON(symbolMaster, '119');
      layers[symbolMaster.symbolID] = newLayer;
    });

    // Clear out page layers to prepare for re-render
    resetLayer(symbolsPage);

    renderLayers(
      Object.keys(layers).map((k) => layers[k]),
      symbolsPage,
    );

    documentData.setCurrentPage(currentPage);
  }
};

const SymbolInstancePropTypes = {
  style: PropTypes.shape(ViewStylePropTypes),
  name: PropTypes.string,
  overrides: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  resizingConstraint: PropTypes.shape({
    ...ResizingConstraintPropTypes,
  }),
};

export type SymbolInstanceProps = PropTypes.InferProps<typeof SymbolInstancePropTypes>;

export const createSymbolInstanceClass = (symbolMaster: FileFormat.SymbolMaster) => {
  return class SymbolInstance extends React.Component<SymbolInstanceProps> {
    static displayName = `SymbolInstance(${symbolMaster.name})`;

    static propTypes = SymbolInstancePropTypes;

    static symbolID = symbolMaster.symbolID;

    static masterName = symbolMaster.name;

    render() {
      return (
        <sketch_symbolinstance
          symbolID={symbolMaster.symbolID}
          name={this.props.name || symbolMaster.name}
          style={StyleSheet.flatten(this.props.style)}
          resizingConstraint={this.props.resizingConstraint}
          overrides={this.props.overrides}
        />
      );
    }
  };
};

const SymbolMasterPropTypes = {
  style: PropTypes.shape(ViewStylePropTypes),
  name: PropTypes.string,
};

export type SymbolMasterProps = PropTypes.InferProps<typeof SymbolMasterPropTypes>;

export const makeSymbol = (bridge: PlatformBridge) => (
  Component: React.ComponentType<any>,
  symbolProps: string | SymbolMasterProps,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
) => {
  if (!hasInitialized && getSketchVersion() !== 'NodeJS') {
    const documentData = getDocumentData(document);
    if (documentData) {
      getExistingSymbols(documentData);
    }
  }

  const masterName =
    (typeof symbolProps === 'string' ? symbolProps : (symbolProps || {}).name) ||
    displayName(Component);
  const existingSymbol = existingSymbols.find((symbolMaster) => symbolMaster.name === masterName);
  const symbolID = existingSymbol
    ? existingSymbol.symbolID
    : generateID(`symbolID:${masterName}`, !!masterName);

  const symbolMaster = flexToSketchJSON(bridge)(
    buildTree(bridge)(
      <sketch_symbolmaster
        {...(typeof symbolProps !== 'string' ? symbolProps || {} : {})}
        symbolID={symbolID}
        name={masterName}
      >
        <Component />
      </sketch_symbolmaster>,
    ),
  ) as FileFormat.SymbolMaster;

  symbolsRegistry[symbolID] = symbolMaster;
  return createSymbolInstanceClass(symbolMaster);
};

function tryGettingSymbolMasterInDocumentByName(
  name: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): FileFormat.SymbolMaster | undefined {
  const documentData = getDocumentData(document);

  if (!documentData) {
    return undefined;
  }

  const symbols = documentData.symbolMap();
  const symbol = Object.keys(symbols).find((k) => symbols[k].name() === name);

  if (!symbol) {
    return undefined;
  }

  return toSJSON(symbol) as FileFormat.SymbolMaster;
}

function tryGettingSymbolMasterInDocumentById(
  symbolID: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): FileFormat.SymbolMaster | undefined {
  const documentData = getDocumentData(document);

  if (!documentData) {
    return undefined;
  }

  const symbol = documentData.symbolMap()[symbolID];

  if (!symbol) {
    return undefined;
  }

  return toSJSON(symbol) as FileFormat.SymbolMaster;
}

export const getSymbolMasterByName = (
  name: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): FileFormat.SymbolMaster | undefined => {
  const symbolID = name
    ? Object.keys(symbolsRegistry).find((key) => String(symbolsRegistry[key].name) === name)
    : '';

  if (typeof symbolID === 'undefined' && name && getSketchVersion() !== 'NodeJS') {
    return tryGettingSymbolMasterInDocumentByName(name, document);
  }

  if (typeof symbolID === 'undefined') {
    throw new Error('##FIXME## NO MASTER FOR THIS SYMBOL NAME');
  }

  return symbolsRegistry[symbolID];
};

export const getSymbolMasterById = (
  symbolID?: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): FileFormat.SymbolMaster | undefined => {
  let symbolMaster = symbolID ? symbolsRegistry[symbolID] : undefined;

  if (typeof symbolMaster === 'undefined' && symbolID && getSketchVersion() !== 'NodeJS') {
    symbolMaster = tryGettingSymbolMasterInDocumentById(symbolID, document);
  }

  if (typeof symbolMaster === 'undefined') {
    throw new Error('##FIXME## NO MASTER WITH THAT SYMBOL ID');
  }

  return symbolMaster;
};

export const getSymbolComponentById = (
  symbolID: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
) => {
  const symbolMaster = getSymbolMasterById(symbolID, document);
  if (!symbolMaster) {
    return undefined;
  }
  return createSymbolInstanceClass(symbolMaster);
};

export const getSymbolComponentByName = (
  masterName: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
) => {
  const symbolMaster = getSymbolMasterByName(masterName, document);
  if (!symbolMaster) {
    return undefined;
  }
  return createSymbolInstanceClass(symbolMaster);
};
