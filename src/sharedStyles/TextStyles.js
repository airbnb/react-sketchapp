/* @flow */
import invariant from 'invariant';
import type { SJStyle } from 'sketchapp-json-flow-types';
import type { SketchContext, SketchStyle, TextStyle } from '../types';
import { sketchVersionIsCompatible } from '../utils/compat';
import { SKETCH_LOWEST_COMPATIBLE_APP_VERSION } from '../utils/constants';
import hashStyle from '../utils/hashStyle';
import sharedTextStyles from '../wrappers/sharedTextStyles';
import { makeTextStyle } from '../jsonUtils/hacksForJSONImpl';
import pick from '../utils/pick';

type MurmurHash = number;
type SketchObjectID = string;
// stored styles
const INHERITABLE_STYLES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'textShadowOffset',
  'textShadowRadius',
  'textShadowColor',
  'textTransform',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'writingDirection',
];

type StyleHash = { [key: MurmurHash]: SketchStyle };

type RegisteredStyle = {|
  cssStyle: TextStyle,
  name: string,
  sketchStyle: SJStyle,
  sharedObjectID: SketchObjectID
|};

let _styles: StyleHash = {};
const _byName: { [key: string]: MurmurHash } = {};

const registerStyle = (name: string, style: TextStyle): void => {
  const safeStyle = pick(style, INHERITABLE_STYLES);
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
  context: SketchContext
};

const create = (
  options: Options,
  styles: { [key: string]: TextStyle }
): StyleHash => {
  const { clearExistingStyles, context } = options;

  invariant(options && options.context, 'Please provide a context');

  if (!sketchVersionIsCompatible()) {
    return context.document.showMessage(
      `💎 Requires Sketch ${SKETCH_LOWEST_COMPATIBLE_APP_VERSION}+ 💎`
    );
  }

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
