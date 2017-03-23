/* @flow */
import invariant from 'invariant';
import { appVersionSupported } from 'sketchapp-json-plugin';
import type { SJStyle } from 'sketchapp-json-flow-types';
import type { SketchContext, SketchStyle, TextStyle } from '../types';
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
  sharedObjectID: SketchObjectID,
|};

let _styles: StyleHash = {};

const registerStyle = (styles: StyleHash, key: string, style: TextStyle): StyleHash => {
  const safeStyle = pick(style, INHERITABLE_STYLES);
  const hash = hashStyle(safeStyle);
  const sketchStyle = makeTextStyle(safeStyle);
  const sharedObjectID = sharedTextStyles.addStyle(key, sketchStyle);

  return {
    ...styles,
    [hash]: {
      cssStyle: safeStyle,
      name: key,
      sketchStyle,
      sharedObjectID,
    },
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

  _styles = Object.keys(styles).reduce((acc, key) => registerStyle(acc, key, styles[key]), _styles);

  return _styles;
};

const resolve = (style: TextStyle): ?RegisteredStyle => {
  const hash = hashStyle(style);

  return _styles[hash];
};

const styles = () => _styles;

const TextStyles = {
  create,
  resolve,
  styles,
};

export default TextStyles;
