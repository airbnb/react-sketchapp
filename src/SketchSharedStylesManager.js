/* @flow */
import type { SketchNode } from './types';
import { addTextStyleFromLayer } from './bridge/text';

class StyleManager {
  context: any;

  constructor() {
    this.context = null;
  }

  setContext(context: any) {
    this.context = context;
    return context;
  }

  addTextStyle(node: SketchNode) {
    const sharedStyles = this.context.document.documentData().layerTextStyles();
    addTextStyleFromLayer(sharedStyles, node);
  }
}

export default new StyleManager();
