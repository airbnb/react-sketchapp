/* @flow */
import type { LayoutInfo, ViewStyle, TextStyle, SketchLayer } from '../types';

class SketchRenderer {
  getDefaultGroupName(/* props: any, value: ?string */) {
    return 'Group';
  }
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): SketchLayer {
    const layer = MSLayerGroup.alloc().init();

    layer.frame().setX(layout.left);
    layer.frame().setY(layout.top);
    layer.frame().setWidth(layout.width);
    layer.frame().setHeight(layout.height);

    if (props.name) {
      layer.setName(props.name);
    } else {
      layer.setName(this.getDefaultGroupName(props, value));
    }

    // TODO(lmr): applying transform to the group would be ideal, but not sure if it's possible
    // if (style.transform !== undefined) {
    //   processTransform(layer, layout, style.transform);
    // }

    if (style.opacity !== undefined) {
      layer.style().contextSettings().opacity = style.opacity;
    }

    return layer;
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): Array<SketchLayer> {
    return [];
  }
}

module.exports = SketchRenderer;
