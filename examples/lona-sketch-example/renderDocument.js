import generateId from 'sketch-file/generateId';
import { TextStyles } from '../../lib';
import createSymbol from './symbol';

import _TextStyles from './generated/textStyles';
import Button from './generated/components/Button';

const fs = require('fs');

const ButtonMeta = JSON.parse(
  fs.readFileSync('../../../ds-workshop/template/components/Button.component'),
);

const components = [
  {
    compiled: Button,
    meta: ButtonMeta,
  },
];

TextStyles.create(
  {
    idMap: Object.keys(_TextStyles).reduce((prev, k) => {
      prev[k] = generateId(k);
      return prev;
    }, {}),
  },
  Object.keys(_TextStyles).reduce((prev, k) => {
    prev[k] = _TextStyles[k];
    return prev;
  }, {}),
);

const symbols = components.reduce((prev, component) => {
  prev = prev.concat(
    component.meta.examples.map(example =>
      createSymbol(component.compiled, example.params, example.name),
    ),
  );
  return prev;
}, []);

const arrangedSymbols = symbols.reduce(
  (acc, symbol) => {
    const { result, offset } = acc;

    symbol.frame.y = offset;
    result.push(symbol);

    return {
      result,
      offset: offset + symbol.frame.height + 48,
    };
  },
  {
    result: [],
    offset: 0,
  },
);

export default () => ({
  layers: arrangedSymbols.result,
  textStyles: TextStyles.toJSON(),
});
