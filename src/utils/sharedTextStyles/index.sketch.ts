import invariant from 'invariant';
import { fromSJSON } from '../../jsonUtils/sketchJson/fromSJSON';
import { toSJSON } from '../../jsonUtils/sketchJson/toSJSON';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchDocument, TextStyle } from '../../types';
import { generateID } from '../../jsonUtils/models';
import { parseTextStyle } from '../../jsonUtils/textLayers';

class TextStyles {
  _document: SketchDocument | null;

  constructor() {
    this._document = null;
  }

  setDocument(doc?: SketchDocument) {
    invariant(doc, 'Please provide a sketch document reference');

    this._document = doc;
    return this;
  }

  setStyles(styles: Array<any>) {
    invariant(this._document, 'Please provide a sketch document reference');

    this._document.documentData().layerTextStyles().setObjects(styles);

    return this;
  }

  addStyle(name: string, style: FileFormat.Style): string {
    const { _document } = this;
    invariant(_document, 'Please provide a sketch document reference');

    const nativeStyle = fromSJSON(style, '119');

    const container = _document.documentData().layerTextStyles();

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

  getStyle(name: string, document?: SketchDocument): TextStyle | undefined {
    const { _document } = this;
    const doc = document || _document;

    invariant(doc, 'Please provide a sketch document reference');

    const sharedStyles = doc.documentData().layerTextStyles().objects();

    let foundStyle = undefined;
    for (let i = 0; i < sharedStyles.length; i++) {
      if (String(sharedStyles[i].name()) === String(name)) {
        foundStyle = sharedStyles[i].style();
      }
    }

    if (!foundStyle) {
      return undefined;
    }

    const style = toSJSON(foundStyle) as FileFormat.Style;

    return parseTextStyle(style);
  }
}

export const sharedTextStyles = new TextStyles();
