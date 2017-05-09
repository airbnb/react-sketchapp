import React from 'react';
import PropTypes from 'prop-types';
import type { SJSymbolMaster } from 'sketchapp-json-flow-types';
import { fromSJSONDictionary } from 'sketchapp-json-plugin';
import StyleSheet from './stylesheet';
import { generateID } from './jsonUtils/models';
import ViewStylePropTypes from './components/ViewStylePropTypes';
import type { SketchContext } from './types';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';

let id = 0;
const nextId = () => ++id; // eslint-disable-line

const displayName = (Component: React$Component): string =>
  Component.displayName || Component.name || `Unknown_${nextId()}`;

const mastersNameRegistry = {};
const mastersSymbolIdRegistry = {};

export const makeSymbol = (Component: React$Component): React$Component => {
  const innerName = displayName(Component);
  const symbolId = generateID();

  mastersNameRegistry[innerName] = mastersSymbolIdRegistry[symbolId] = flexToSketchJSON(
    buildTree(
      <symbolmaster symbolID={symbolId} name={innerName}>
        <Component />
      </symbolmaster>
    )
  );

  return class extends React.Component {
    static displayName = `SymbolInstance(${innerName})`;

    static propTypes = {
      style: PropTypes.shape(ViewStylePropTypes),
      name: PropTypes.string,
      overrides: PropTypes.object // eslint-disable-line
    };

    static symbolId = symbolId;

    render() {
      return (
        <symbolinstance
          symbolID={symbolId}
          name={this.props.name || innerName}
          style={StyleSheet.flatten(this.props.style)}
          overrides={this.props.overrides}
        />
      );
    }
  };
};

const pageListToArray = (pageList) => {
  const out = [];
  // eslint-disable-next-line
  for (let i = 0; i < pageList.length; i++) {
    out.push(pageList[i]);
  }
  return out;
};

export const injectSymbols = (context: SketchContext) => {
  const pages = context.document.pages();
  const array = pageListToArray(pages);

  let symbolsPage = array.find(p => String(p.name()) === 'Symbols');
  if (!symbolsPage) {
    symbolsPage = context.document.addBlankPage();
    symbolsPage.setName('Symbols');
  }

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

export const getMasterByName = (name: string): ?SJSymbolMaster => mastersNameRegistry[name];

export const getMasterBySymbolId = (symbolId: string): SJSymbolMaster => {
  if (!mastersSymbolIdRegistry.hasOwnProperty(symbolId)) {
    // eslint-disable-line
    throw new Error('##FIXME## NO MASTER FOR THIS SYMBOL ID');
  }
  return mastersSymbolIdRegistry[symbolId];
};
