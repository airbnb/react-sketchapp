/* @flow */
import type { SketchContext, SketchSharedStyleContainer, SketchStyle } from './types';

class TextStyles {
  _context: any;
  _layerTextStyles: SketchSharedStyleContainer;

  constructor(context: SketchContext) {
    this._context = context;
    this._layerTextStyles = context.document.documentData().layerTextStyles();
  }

  setStyles(styles: Array<any>) {
    this._layerTextStyles.setObjects(styles);
  }

  addStyle(name: string, style: SketchStyle) {
    this._layerTextStyles.addSharedStyleWithName_firstInstance(name, style);
  }
}

export default TextStyles;
