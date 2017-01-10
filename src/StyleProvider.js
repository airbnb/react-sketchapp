/* @flow */
import invariant from 'invariant';
import type { Dictionary, SketchContext } from './types';
import createLayerFromStyle from './createLayerFromStyle';
import hashStyle from './utils/hashStyle';

// input css style
type Style = Dictionary<string, any>;

// stored styles
type StyleHash = Dictionary<string, any>;

let _styles: StyleHash = {};
let _context: SketchContext = null;

const _clearExistingStyles = (): void => {
  _context.sharedStyles.setObjects([]);
};

const registerStyle = (key: string, style: Style): StyleHash => {
  invariant(_context, 'Please provide a context');
  const layer = createLayerFromStyle(key, style);
  const className = hashStyle(style);

  _context.sharedStyles.addSharedStyleWithName_firstInstance(key, layer.style());
  _styles = {
    ..._styles,
    [className]: layer.style(),
  };
  return _styles;
};

type Options = {
  clearExistingStyles?: boolean,
  context: SketchContext,
}

const create = (options: Options, styles: Dictionary<string, Style>): StyleHash => {
  invariant(options && options.context, 'Please provide a context');
  const { clearExistingStyles, context } = options;

  _context = context;
  if (clearExistingStyles) { _clearExistingStyles(); }

  return Object
    .keys(styles)
    .reduce((acc, key) =>
      registerStyle(key, styles[key])
    , null);
};

const StyleProvider = {
  registerStyle,
  create,
  styles() {
    return _styles;
  },
};

export default StyleProvider;
