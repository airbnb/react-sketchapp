import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchDocument, TextStyle } from '../../types';
import { generateID } from '../../jsonUtils/models';

class TextStyles {
  setDocument(_doc?: SketchDocument) {
    return this;
  }

  setStyles(_styles: Array<any>) {
    return this;
  }

  addStyle(name: string, _style: FileFormat.Style): string {
    return generateID(`sharedStyle:${name}`, !!name);
  }

  getStyle(_name: string, _document?: SketchDocument): TextStyle | undefined {
    return undefined;
  }
}

export const sharedTextStyles = new TextStyles();
