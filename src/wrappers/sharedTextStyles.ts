import invariant from 'invariant';
import { fromSJSON } from '../jsonUtils/sketchImpl/json-to-sketch';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchContext } from '../types';
import { generateID } from '../jsonUtils/models';

class TextStyles {
  _context?: SketchContext;

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

  addStyle(name: string, style: FileFormat.Style): string {
    const { _context } = this;
    invariant(_context, 'Please provide a context');

    const nativeStyle = fromSJSON(style, '119');

    // Flow doesn't pick up invariant truthies
    const context: SketchContext = _context;

    const container = context.document.documentData().layerTextStyles();

    let sharedStyle: any;

    // Sketch < 50
    if (container.addSharedStyleWithName_firstInstance) {
      sharedStyle = container.addSharedStyleWithName_firstInstance(name, nativeStyle);
    } else {
      const allocator = MSSharedStyle.alloc();
      // Sketch 50, 51
      if (allocator.initWithName_firstInstance) {
        sharedStyle = allocator.initWithName_firstInstance(name, nativeStyle);
      } else {
        sharedStyle = allocator.initWithName_style(name, nativeStyle);
      }

      container.addSharedObject(sharedStyle);
    }

    sharedStyle.objectID = generateID(`sharedStyle:${name}`, !!name);

    // NOTE(gold): the returned object ID changes after being added to the store
    // _don't_ rely on the object ID we pass to it, but we have to have one set
    // otherwise Sketch crashes
    return String(sharedStyle.objectID());
  }
}

export default new TextStyles();
