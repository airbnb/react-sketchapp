/* @flow */
import invariant from 'invariant';
import { appVersionSupported } from 'sketchapp-json-plugin';
import type { SJStyle } from '@skpm/sketchapp-json-flow-types';
import type { SketchContext, SketchStyle, TextStyle } from '../types';
import hashStyle from '../utils/hashStyle';
import sharedTextStyles from '../wrappers/sharedTextStyles';
import { makeTextStyle } from '../jsonUtils/hacksForJSONImpl';
import pick from '../utils/pick';
import { INHERITABLE_FONT_STYLES } from '../utils/constants';

type MurmurHash = number;
type SketchObjectID = string;

type StyleHash = { [key: MurmurHash]: SketchStyle };

type RegisteredStyle = {|
  cssStyle: TextStyle,
  name: string,
  sketchStyle: SJStyle,
  sharedObjectID: SketchObjectID,
|};

let _styles: StyleHash = {};
const _byName: { [key: string]: MurmurHash } = {};

const registerStyle = (name: string, style: TextStyle): void => {
  const safeStyle = pick(style, INHERITABLE_FONT_STYLES);
  const hash = hashStyle(safeStyle);
  const sketchStyle = makeTextStyle(safeStyle);
  const sharedObjectID = sharedTextStyles.addStyle(name, sketchStyle);

  // FIXME(gold): side effect :'(
  _byName[name] = hash;

  _styles[hash] = {
    cssStyle: safeStyle,
    name,
    sketchStyle,
    sharedObjectID,
  };
};

type Options = {
  clearExistingStyles?: boolean,
  context: SketchContext,
};

const create = (options: Options, styles: { [key: string]: TextStyle }): StyleHash => {
  const { clearExistingStyles, context } = options;

  if (!appVersionSupported()) {
    return context.document.showMessage('💎 Requires Sketch 43+ 💎');
  }

  invariant(options && options.context, 'Please provide a context');

  sharedTextStyles.setContext(context);

  if (clearExistingStyles) {
    _styles = {};
    sharedTextStyles.setStyles([]);
  }

  Object.keys(styles).forEach(name => registerStyle(name, styles[name]));

  return _styles;
};

const resolve = (style: TextStyle): ?RegisteredStyle => {
  const hash = hashStyle(style);

  return _styles[hash];
};

const get = (name: string): TextStyle => {
  const hash = _byName[name];
  const style = _styles[hash];

  return style ? style.cssStyle : {};
};

const clear = () => {
  _styles = {};
  sharedTextStyles.setStyles([]);
};

const styles = () => _styles;

const TextStyles = {
  create,
  resolve,
  get,
  styles,
  clear,
};

export default TextStyles;
