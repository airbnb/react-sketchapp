/* @flow */
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

class ArtboardRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): SketchLayer {
    const layer = MSArtboardGroup.alloc().init();

    layer.frame = MSRect.rectWithRect(
      NSMakeRect(layout.top, layout.left, layout.width, layout.height),
    );

    if (props.name !== undefined) {
      layer.setName(props.name);
    }

    if (style.backgroundColor !== undefined) {
      layer.setBackgroundColor(convertToColor(style.backgroundColor));
      layer.hasBackgroundColor = true;
    }

    return layer;
  }
}

module.exports = ArtboardRenderer;
