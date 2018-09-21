import * as React from 'react';
import generateId from 'sketch-file/generateId';

import { renderToJSON } from '../../lib';

let id = 0;
const nextId = () => ++id; // eslint-disable-line

const displayName = Component =>
  Component.displayName || Component.name || `UnknownSymbol${nextId()}`;

export default function createSymbol(Component, name) {
  const masterName = name || displayName(Component);
  const symbolID = generateId(masterName);
  const symbolMaster = renderToJSON(
    <symbolmaster symbolID={symbolID} name={masterName}>
      <Component />
    </symbolmaster>,
  );
  return symbolMaster;
}
