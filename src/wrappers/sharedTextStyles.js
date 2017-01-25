/* @flow */
import invariant from 'invariant';
import type { SketchContext, SketchStyle } from '../types';

class TextStyles {
  _context: ?SketchContext;

  constructor() {
    this._context = null;
  }

  setContext(context: SketchContext) {
    invariant(context, 'Please provide a context');

    this._context = context;
    return this;
  }

  setStyles(styles: Array<any>) {
    invariant(this._context, 'Please provide a context');

    this._context.document.documentData().layerTextStyles()
      .setObjects(styles);

    return this;
  }

  addStyle(name: string, style: SketchStyle) {
    invariant(this._context, 'Please provide a context');

    this._context.document.documentData().layerTextStyles()
      .addSharedStyleWithName_firstInstance(name, style);

    return this;
  }
}

export default new TextStyles();
