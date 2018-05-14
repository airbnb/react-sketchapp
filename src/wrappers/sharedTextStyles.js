/* @flow */
import invariant from 'invariant';
import { fromSJSONDictionary } from 'sketchapp-json-plugin';
import type { SJStyle } from '@skpm/sketchapp-json-flow-types';
import type { SketchContext } from '../types';

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

    this._context.document
      .documentData()
      .layerTextStyles()
      .setObjects(styles);

    return this;
  }

  addStyle(name: string, style: SJStyle) {
    invariant(this._context, 'Please provide a context');

    const textStyle = fromSJSONDictionary(style);

    // Flow doesn't pick up invariant truthies
    const context: SketchContext = this._context;

    const container = context.document.documentData().layerTextStyles();

    if (container.addSharedStyleWithName_firstInstance) {
      const s = container.addSharedStyleWithName_firstInstance(name, textStyle);

      // NOTE(gold): the returned object ID changes after being added to the store
      // _don't_ rely on the object ID we pass to it, but we have to have one set
      // otherwise Sketch crashes
      return s.objectID();
    }
    // addSharedStyleWithName_firstInstance was removed in Sketch 50
    const s = MSSharedStyle.alloc().initWithName_firstInstance(name, textStyle);
    container.addSharedObject(s);

    return s.objectID();
  }
}

export default new TextStyles();
