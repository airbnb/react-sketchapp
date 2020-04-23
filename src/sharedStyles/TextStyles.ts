import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import {
  SketchDocumentData,
  SketchDocument,
  WrappedSketchDocument,
  TextStyle,
  PlatformBridge,
} from '../types';
import { getSketchVersion } from '../utils/getSketchVersion';
import { hashStyle } from '../utils/hashStyle';
import { getDocument } from '../utils/getDocument';
import { sharedTextStyles } from '../utils/sharedTextStyles';
import { makeTextStyle } from '../jsonUtils/textLayers';
import { pick } from '../utils/pick';
import { INHERITABLE_FONT_STYLES } from '../utils/constants';

type MurmurHash = string;

type RegisteredStyle = {
  cssStyle: TextStyle;
  name: string;
  sketchStyle: FileFormat.Style;
  sharedObjectID: FileFormat.Uuid;
};

type StyleHash = { [key: string]: RegisteredStyle };

type Options = {
  clearExistingStyles?: boolean;
  document?: SketchDocumentData | SketchDocument | WrappedSketchDocument;
};

let _styles: StyleHash = {};
const _byName: { [key: string]: MurmurHash } = {};

export const TextStyles = (getDefaultBridge: () => PlatformBridge) => ({
  registerStyle(
    name: string,
    style: TextStyle,
    platformBridge: PlatformBridge = getDefaultBridge(),
  ) {
    const safeStyle = pick(style, INHERITABLE_FONT_STYLES);
    const hash = hashStyle(safeStyle);
    const sketchStyle = makeTextStyle(platformBridge)(safeStyle);
    const sharedObjectID = sharedTextStyles.addStyle(name, sketchStyle);

    // FIXME(gold): side effect :'(
    _byName[name] = hash;

    _styles[hash] = {
      cssStyle: safeStyle,
      name,
      sketchStyle,
      sharedObjectID,
    };
  },

  create(
    styles: { [key: string]: TextStyle },
    options: Options = {},
    platformBridge: PlatformBridge = getDefaultBridge(),
  ): StyleHash {
    const { clearExistingStyles, document } = options;

    const doc = getDocument(document);

    const sketchVersion = getSketchVersion();

    if (sketchVersion !== 'NodeJS' && sketchVersion < 50) {
      if (doc) {
        doc.showMessage('💎 Requires Sketch 50+ 💎');
      }
      return {};
    }

    sharedTextStyles.setDocument(doc);

    if (clearExistingStyles) {
      _styles = {};
      sharedTextStyles.setStyles([]);
    }

    Object.keys(styles).forEach((name) => this.registerStyle(name, styles[name], platformBridge));

    return _styles;
  },

  resolve(style?: TextStyle): RegisteredStyle | undefined {
    if (!style) {
      return undefined;
    }
    const safeStyle = pick(style, INHERITABLE_FONT_STYLES);
    const hash = hashStyle(safeStyle);

    return _styles[hash];
  },

  get(
    name: string,
    document?: SketchDocumentData | SketchDocument | WrappedSketchDocument,
  ): TextStyle | undefined {
    const hash = _byName[name];
    const style = _styles[hash];

    if (style) {
      return style.cssStyle;
    }

    return sharedTextStyles.getStyle(name, document ? getDocument(document) : undefined);
  },

  clear(): void {
    _styles = {};
    sharedTextStyles.setStyles([]);
  },

  toJSON(): FileFormat.SharedStyle[] {
    return Object.keys(_styles).map((k) => ({
      _class: 'sharedStyle',
      do_objectID: _styles[k].sharedObjectID,
      name: _styles[k].name,
      value: _styles[k].sketchStyle,
    }));
  },

  styles() {
    return _styles;
  },
});
