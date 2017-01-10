/* @flow */
import invariant from 'invariant';
import type { SketchContext, SketchSharedStyleContainer, SketchStyle } from './types';

class TextStyles {
  _context: any;
  _layerTextStyles: SketchSharedStyleContainer;

  constructor(context?: SketchContext) {
    if (context) { this.setContext(context); }
  }

  setContext(context: SketchContext) {
    invariant(context, 'Please provide a context');

    this._context = context;
    this._layerTextStyles = context.document.documentData().layerTextStyles();
    return this;
  }

  setStyles(styles: Array<any>) {
    invariant(this._layerTextStyles, 'Please provide a context');

    this._layerTextStyles.setObjects(styles);
    return this;
  }

  addStyle(name: string, style: SketchStyle) {
    invariant(this._layerTextStyles, 'Please provide a context');

    this._layerTextStyles.addSharedStyleWithName_firstInstance(name, style);
    return this;
  }
}

export default new TextStyles();
