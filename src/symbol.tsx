import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { fromSJSON } from './jsonUtils/sketchImpl/json-to-sketch';
import { toSJSON } from './jsonUtils/sketchImpl/sketch-to-json';
import StyleSheet from './stylesheet';
import { generateID } from './jsonUtils/models';
import ViewStylePropTypes from './components/ViewStylePropTypes';
import ResizingConstraintPropTypes from './components/ResizingConstraintPropTypes';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { renderLayers } from './render';
import { resetLayer } from './resets';
import { getDocumentDataFromContext } from './utils/getDocument';
import { SketchDocumentData, SketchDocument, WrappedSketchDocument } from './types';
import { getSketchVersion } from './utils/getSketchVersion';

let id = 0;
const nextId = () => ++id; // eslint-disable-line

const displayName = (Component: React.ComponentType<any>): string =>
  Component.displayName || Component.name || `UnknownSymbol${nextId()}`;

let hasInitialized = false;
const symbolsRegistry: { [name: string]: FileFormat.SymbolMaster } = {};
let existingSymbols: FileFormat.SymbolMaster[] = [];
const layers: { [symbolID: string]: any } = {};

function msListToArray<T>(pageList: T[]): T[] {
  const out = [];
  // eslint-disable-next-line
  for (let i = 0; i < pageList.length; i++) {
    out.push(pageList[i]);
  }
  return out;
}

const getDocumentData = (
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): SketchDocumentData => {
  let nativeDocument: SketchDocumentData | SketchDocument;
  let nativeDocumentData: SketchDocumentData;

  if (!document) {
    nativeDocument = getDocumentDataFromContext(context);
  } else if ('sketchObject' in document) {
    nativeDocument = document.sketchObject;
  } else {
    nativeDocument = document;
  }

  if ('documentData' in nativeDocument) {
    nativeDocumentData = nativeDocument.documentData();
  } else {
    nativeDocumentData = nativeDocument;
  }

  return nativeDocumentData;
};

const getSymbolsPage = (documentData: SketchDocumentData) =>
  documentData.symbolsPageOrCreateIfNecessary();

const getExistingSymbols = (documentData: SketchDocumentData) => {
  if (!hasInitialized) {
    hasInitialized = true;

    const symbolsPage = getSymbolsPage(documentData);

    existingSymbols = msListToArray(symbolsPage.layers())
      .map(x => {
        const symbolJson = toSJSON(x);
        if (symbolJson._class !== 'symbolMaster') {
          return undefined;
        }
        layers[symbolJson.symbolID] = x;
        return symbolJson;
      })
      .filter(x => x);

    existingSymbols.forEach(symbolMaster => {
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
  if (hasInitialized) {
    const documentData = getDocumentData(document);
    const currentPage = documentData.currentPage();

    const symbolsPage = getSymbolsPage(documentData);

    let left = 0;
    Object.keys(symbolsRegistry).forEach(key => {
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
      Object.keys(layers).map(k => layers[k]),
      symbolsPage,
    );

    documentData.setCurrentPage(currentPage);
  }
};

const SymbolInstancePropTypes = {
  style: PropTypes.shape(ViewStylePropTypes),
  name: PropTypes.string,
  overrides: PropTypes.object, // eslint-disable-line
  resizingConstraint: PropTypes.shape({
    ...ResizingConstraintPropTypes,
  }),
};

export type SymbolInstanceProps = PropTypes.InferProps<typeof SymbolInstancePropTypes>;

export const createSymbolInstanceClass = (
  symbolMaster: FileFormat.SymbolMaster,
): React.ComponentClass<SymbolInstanceProps> => {
  return class extends React.Component<SymbolInstanceProps> {
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

export const makeSymbol = (
  Component: React.ComponentType<any>,
  name: string,
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
): React.ComponentType<any> => {
  if (!hasInitialized && getSketchVersion() !== 'NodeJS') {
    getExistingSymbols(getDocumentData(document));
  }

  const masterName = name || displayName(Component);
  const existingSymbol = existingSymbols.find(symbolMaster => symbolMaster.name === masterName);
  const symbolID = existingSymbol
    ? existingSymbol.symbolID
    : generateID(`symbolID:${masterName}`, !!name);

  const symbolMaster = flexToSketchJSON(
    buildTree(
      <sketch_symbolmaster symbolID={symbolID} name={masterName}>
        <Component />
      </sketch_symbolmaster>,
    ),
  ) as FileFormat.SymbolMaster;

  symbolsRegistry[symbolID] = symbolMaster;
  return createSymbolInstanceClass(symbolMaster);
};

export const getSymbolMasterByName = (name: string): FileFormat.SymbolMaster => {
  const symbolID = Object.keys(symbolsRegistry).find(
    key => String(symbolsRegistry[key].name) === name,
  );

  if (typeof symbolID === 'undefined') {
    throw new Error('##FIXME## NO MASTER FOR THIS SYMBOL NAME');
  }

  return symbolsRegistry[symbolID];
};

export const getSymbolMasterById = (symbolID?: string): FileFormat.SymbolMaster => {
  const symbolMaster = symbolID ? symbolsRegistry[symbolID] : undefined;
  if (typeof symbolMaster === 'undefined') {
    throw new Error('##FIXME## NO MASTER WITH THAT SYMBOL ID');
  }

  return symbolMaster;
};

export const getSymbolComponentByName = (masterName: string): React.ComponentType<any> =>
  createSymbolInstanceClass(getSymbolMasterByName(masterName));
