import React from 'react';
import PropTypes from 'prop-types';
import type { SJSymbolMaster } from 'sketchapp-json-flow-types';
import { fromSJSONDictionary, toSJSON } from 'sketchapp-json-plugin';
import StyleSheet from './stylesheet';
import { generateID } from './jsonUtils/models';
import ViewStylePropTypes from './components/ViewStylePropTypes';
import type { SketchContext } from './types';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';

let id = 0;
const nextId = () => ++id; // eslint-disable-line

const displayName = (Component: React$Component): string =>
  Component.displayName || Component.name || `UnknownSymbol${nextId()}`;

const mastersNameRegistry = {};
let existingSymbols = null;

const msListToArray = (pageList) => {
  const out = [];
  // eslint-disable-next-line
  for (let i = 0; i < pageList.length; i++) {
    out.push(pageList[i]);
  }
  return out;
};

export const getExistingSymbols = (context: SketchContext) => {
  const pages = context.document.pages();
  const array = msListToArray(pages);
  if (existingSymbols === null) {
    let symbolsPage = array.find(p => String(p.name()) === 'Symbols');
    if (!symbolsPage) {
      symbolsPage = context.document.addBlankPage();
      symbolsPage.setName('Symbols');
    }

    existingSymbols = msListToArray(symbolsPage.layers()).map(x =>
      JSON.parse(toSJSON(x))
    );
  }
  return existingSymbols;
};

export const getSymbolId = (masterName: string, symbols): string => {
  let symbolId = generateID();

  symbols.forEach((symbolMaster) => {
    if (symbolMaster.name === masterName) {
      symbolId = symbolMaster.symbolID;
    }
  });
  return symbolId;
};

export const makeSymbolByName = (masterName: string): React$Component =>
  class extends React.Component {
    static displayName = `SymbolInstance(${masterName})`;

    static propTypes = {
      style: PropTypes.shape(ViewStylePropTypes),
      name: PropTypes.string,
      overrides: PropTypes.object // eslint-disable-line
    };

    static masterName = masterName;

    render() {
      return (
        <symbolinstance
          masterName={masterName}
          name={this.props.name || masterName}
          style={StyleSheet.flatten(this.props.style)}
          overrides={this.props.overrides}
        />
      );
    }
  };

export const makeSymbol = (
  Component: React$Component,
  context: SketchContext
): React$Component => {
  const masterName = displayName(Component);
  const symbols = getExistingSymbols(context);
  const symbolId = getSymbolId(masterName, symbols);

  mastersNameRegistry[masterName] = flexToSketchJSON(
    buildTree(
      <symbolmaster symbolID={symbolId} name={masterName}>
        <Component />
      </symbolmaster>
    )
  );

  return makeSymbolByName(masterName);
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
    key => String(mastersNameRegistry[key].symbolID) === symbolId
  );

  if (typeof masterName === 'undefined') {
    throw new Error('##FIXME## NO MASTER WITH THAT SYMBOL ID');
  }

  return mastersNameRegistry[masterName];
};

export const injectSymbols = (context: SketchContext) => {
  const pages = context.document.pages();
  const array = msListToArray(pages);

  let symbolsPage = array.find(p => String(p.name()) === 'Symbols');
  if (!symbolsPage) {
    symbolsPage = context.document.addBlankPage();
    symbolsPage.setName('Symbols');
  }
  getExistingSymbols(context);

  existingSymbols.forEach((symbolMaster) => {
    if (symbolMaster._class !== 'symbolMaster') return;
    if (symbolMaster.name in mastersNameRegistry) return;
    mastersNameRegistry[symbolMaster.name] = symbolMaster;
  });

  let left = 0;
  Object.keys(mastersNameRegistry).forEach((key) => {
    const symbolMaster = mastersNameRegistry[key];
    symbolMaster.frame.y = 0;
    symbolMaster.frame.x = left;
    left += symbolMaster.frame.width + 20;
  });

  let notSymbolsPage = array.find(p => String(p.name()) !== 'Symbols');
  if (!notSymbolsPage) {
    notSymbolsPage = context.document.addBlankPage();
  }

  const layers = Object.keys(mastersNameRegistry).map(k =>
    fromSJSONDictionary(mastersNameRegistry[k])
  );

  symbolsPage.replaceAllLayersWithLayers(layers);
  context.document.setCurrentPage(notSymbolsPage);
};
