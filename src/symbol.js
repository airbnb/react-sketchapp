import React from 'react';
import PropTypes from 'prop-types';
import type { SJSymbolMaster } from '@skpm/sketchapp-json-flow-types';
import { fromSJSONDictionary, toSJSON } from 'sketchapp-json-plugin';
import StyleSheet from './stylesheet';
import { generateID } from './jsonUtils/models';
import ViewStylePropTypes from './components/ViewStylePropTypes';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import { renderLayers } from './render';
import { resetLayer } from './resets';
import { getDocumentFromContext } from './utils/getDocument';

let id = 0;
const nextId = () => ++id; // eslint-disable-line

const displayName = (Component: React$Component): string =>
  Component.displayName || Component.name || `UnknownSymbol${nextId()}`;

let mastersNameRegistry = null;
let existingSymbols = null;
const layers = {};

const msListToArray = (pageList) => {
  const out = [];
  // eslint-disable-next-line
  for (let i = 0; i < pageList.length; i++) {
    out.push(pageList[i]);
  }
  return out;
};

export const getSymbolsPage = (document: any) => {
  const pages = document.pages();
  const array = msListToArray(pages);
  return array.find(p => String(p.name()) === 'Symbols');
};

const getExistingSymbols = (document: any) => {
  if (existingSymbols === null) {
    let symbolsPage = getSymbolsPage(document);
    if (!symbolsPage) {
      symbolsPage = document.addBlankPage();
      symbolsPage.setName('Symbols');
    }

    existingSymbols = msListToArray(symbolsPage.layers()).map((x) => {
      const symbolJson = JSON.parse(toSJSON(x));
      layers[symbolJson.symbolID] = x;
      return symbolJson;
    });

    mastersNameRegistry = {};
    existingSymbols.forEach((symbolMaster) => {
      if (symbolMaster._class !== 'symbolMaster') return;
      if (symbolMaster.name in mastersNameRegistry) return;
      mastersNameRegistry[symbolMaster.name] = symbolMaster;
    });
  }
  return existingSymbols;
};

const getSymbolId = (masterName: string): string => {
  let symbolId = generateID();

  existingSymbols.forEach((symbolMaster) => {
    if (symbolMaster.name === masterName) {
      symbolId = symbolMaster.symbolID;
    }
  });
  return symbolId;
};

export const injectSymbols = (document: any) => {
  if (!document) {
    document = getDocumentFromContext(context); // eslint-disable-line
  }
  const currentPage = document.currentPage();

  if (mastersNameRegistry !== null) {
    // if mastersNameRegistry is not an object then makeSymbol was not called
    const symbolsPage = document.documentData().symbolsPageOrCreateIfNecessary();

    let left = 0;
    Object.keys(mastersNameRegistry).forEach((key) => {
      const symbolMaster = mastersNameRegistry[key];
      symbolMaster.frame.y = 0;
      symbolMaster.frame.x = left;
      left += symbolMaster.frame.width + 20;

      const newLayer = fromSJSONDictionary(symbolMaster);
      layers[symbolMaster.symbolID] = newLayer;
    });

    // Clear out page layers to prepare for re-render
    resetLayer(symbolsPage);

    renderLayers(Object.keys(layers).map(k => layers[k]), symbolsPage);

    document.setCurrentPage(currentPage);
  }
};

export const getSymbolComponentByName = (masterName: string): React$Component =>
  class extends React.Component {
    static displayName = `SymbolInstance(${masterName})`;

    static propTypes = {
      style: PropTypes.shape(ViewStylePropTypes),
      name: PropTypes.string,
      overrides: PropTypes.object, // eslint-disable-line
      resizingConstraint: PropTypes.object, // eslint-disable-line
    };

    static masterName = masterName;

    render() {
      return (
        <symbolinstance
          masterName={masterName}
          name={this.props.name || masterName}
          style={StyleSheet.flatten(this.props.style)}
          resizingConstraint={this.props.resizingConstraint}
          overrides={this.props.overrides}
        />
      );
    }
  };

export const makeSymbol = (
  Component: React$Component,
  name: string,
  document?: any,
): React$Component => {
  const masterName = name || displayName(Component);

  if (mastersNameRegistry === null) {
    getExistingSymbols(document || getDocumentFromContext(context));
  }
  const symbolId = getSymbolId(masterName);

  mastersNameRegistry[masterName] = flexToSketchJSON(
    buildTree(
      <symbolmaster symbolID={symbolId} name={masterName}>
        <Component />
      </symbolmaster>,
    ),
  );
  return getSymbolComponentByName(masterName);
};

export const getSymbolMasterByName = (name: string): SJSymbolMaster => {
  // eslint-disable-next-line
  if (!mastersNameRegistry.hasOwnProperty(name)) {
    throw new Error('##FIXME## NO MASTER FOR THIS SYMBOL NAME');
  }
  return mastersNameRegistry[name];
};

export const getSymbolMasterById = (symbolId: string): SJSymbolMaster => {
  const masterName = Object.keys(mastersNameRegistry).find(
    key => String(mastersNameRegistry[key].symbolID) === symbolId,
  );

  if (typeof masterName === 'undefined') {
    throw new Error('##FIXME## NO MASTER WITH THAT SYMBOL ID');
  }

  return mastersNameRegistry[masterName];
};
