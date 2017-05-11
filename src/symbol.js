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

const mastersSymbolIdRegistry = {};

let masterLeftOffset = 0;

export const makeSymbol = (Component: React$Component): React$Component => {
  const innerName = displayName(Component);
  const symbolId = generateID();

  const renderedMaster = flexToSketchJSON(
    buildTree(
      <symbolmaster symbolID={symbolId} name={innerName}>
        <Component />
      </symbolmaster>
    )
  );

  renderedMaster.frame.x = masterLeftOffset;
  masterLeftOffset += renderedMaster.frame.width + 100;
  mastersSymbolIdRegistry[symbolId] = renderedMaster;

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

  const layers = Object.keys(mastersSymbolIdRegistry).map(k =>
    fromSJSONDictionary(mastersSymbolIdRegistry[k])
  );

  symbolsPage.replaceAllLayersWithLayers(layers);
  context.document.setCurrentPage(notSymbolsPage);
};

export const getMasterBySymbolId = (symbolId: string): SJSymbolMaster => {
  // eslint-disable-next-line
  if (!mastersSymbolIdRegistry.hasOwnProperty(symbolId)) {
    throw new Error('##FIXME## NO MASTER FOR THIS SYMBOL ID');
  }
  return mastersSymbolIdRegistry[symbolId];
};
