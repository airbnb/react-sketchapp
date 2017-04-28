import React from 'react';
import PropTypes from 'prop-types';
import { fromSJSONDictionary } from 'sketchapp-json-plugin';
import StyleSheet from './stylesheet';
import { generateID } from './jsonUtils/models';
import ViewStylePropTypes from './components/ViewStylePropTypes';
import type { SketchContext } from './types';
import buildTree from './buildTree';
import flexToSketchJSON from './flexToSketchJSON';
import compose from './utils/compose';

let id = 0;
const nextId = () => ++id; // eslint-disable-line

const displayName = (Component: React$Component): string =>
  Component.displayName || Component.name || `Unknown_${nextId()}`;

const mastersRegistry = {};

const symbolize = (Component: React$Component): React$Component => {
  const innerName = displayName(Component);
  const symbolId = generateID();

  mastersRegistry[innerName] = () => (
    <symbolmaster symbolID={symbolId} name={innerName}>
      <Component />
    </symbolmaster>
  );

  return class extends React.Component {
    static displayName = `SymbolInstance(${innerName})`;

    static propTypes = {
      style: PropTypes.shape(ViewStylePropTypes),
    };

    render() {
      return (
        <symbolinstance
          symbolID={symbolId}
          name={innerName}
          style={StyleSheet.flatten(this.props.style)}
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

const inject = (context: SketchContext) => {
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

  const layers = Object.keys(mastersRegistry).map(k =>
    compose(fromSJSONDictionary, flexToSketchJSON, buildTree, mastersRegistry[k])()
  );

  symbolsPage.replaceAllLayersWithLayers(layers);
  context.document.setCurrentPage(notSymbolsPage);
};

export default {
  symbolize,
  inject,
};
