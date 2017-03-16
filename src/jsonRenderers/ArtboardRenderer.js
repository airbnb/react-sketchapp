/* @flow */
import { generateID, makeRect, makeColorFill, makeColorFromCSS } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import type { SketchJSON, ViewStyle, LayoutInfo, TextStyle } from '../types';

class ArtboardRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): SketchJSON {
    let color;
    if (style.backgroundColor !== undefined) {
      color = makeColorFromCSS(style.backgroundColor);
    }

    return {
      _class: 'artboard',
      do_objectID: generateID(),
      frame: makeRect(layout.top, layout.left, layout.width, layout.height),
      // "layerListExpandedType": 0,
      name: props.name || 'Artboard',
      nameIsFixed: props.name !== undefined,
      // "layers": [],
      isVisible: true,
      backgroundColor: color || makeColorFromCSS('white'),
      hasBackgroundColor: color !== undefined,
    };
  }
}

module.exports = ArtboardRenderer;
