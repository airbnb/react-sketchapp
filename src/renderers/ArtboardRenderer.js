/* @flow */
import type { SJArtboardLayer } from '@skpm/sketchapp-json-flow-types';
import { generateID, makeRect, makeColorFromCSS } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';

class ArtboardRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
  ): SJArtboardLayer {
    let color;
    if (style.backgroundColor !== undefined) {
      color = makeColorFromCSS(style.backgroundColor);
    }

    return {
      _class: 'artboard',
      do_objectID: generateID(),
      frame: makeRect(layout.left, layout.top, layout.width, layout.height),
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
