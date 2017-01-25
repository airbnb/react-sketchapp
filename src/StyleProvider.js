/* @flow */
import invariant from 'invariant';
import type { Dictionary, SketchContext, SketchStyle, TextStyle } from './types';
import applyTextStyleToLayer from './utils/applyTextStyleToLayer';
import hashStyle from './utils/hashStyle';
import sharedTextStyles from './wrappers/sharedTextStyles';
import textLayer from './wrappers/textLayer';

// stored styles
type StyleHash = Dictionary<string, SketchStyle>;

let _styles: StyleHash = {};

const registerStyle = (key: string, style: TextStyle): StyleHash => {
  const layer = applyTextStyleToLayer(
    textLayer(key, { top: 0, left: 0, width: 250, height: 50 }),
    style
  );

  const className = hashStyle(style);

  sharedTextStyles.addStyle(key, layer.style());

  _styles[className] = layer.style();

  return _styles;
};

type Options = {
  clearExistingStyles?: boolean,
  context: SketchContext,
}

const create = (options: Options, styles: Dictionary<string, TextStyle>): StyleHash => {
  invariant(options && options.context, 'Please provide a context');
  const { clearExistingStyles, context } = options;

  sharedTextStyles.setContext(context);

  if (clearExistingStyles) {
    _styles = {};
    sharedTextStyles.setStyles([]);
  }

  Object.keys(styles).forEach(key => registerStyle(key, styles[key]));

  return _styles;
};

const resolve = (style: TextStyle): ?SketchStyle => {
  const hash = hashStyle(style);

  return _styles[hash];
};

const styles = () => _styles;

const TextStyles = {
  registerStyle,
  create,
  resolve,
  styles,
};

export default TextStyles;
