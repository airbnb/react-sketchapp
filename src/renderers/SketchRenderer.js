/* @flow */
import layerGroup from '../jsonUtils/layerGroup';

import type { LayoutInfo, ViewStyle, TextStyle, SketchJSON } from '../types';

const DEFAULT_OPACITY = 1.0;

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
    value: ?string
  ): SketchJSON {
    // Default SketchRenderer just renders an empty group

    // TODO(lmr): applying transform to the group would be ideal, but not sure if it's possible
    // if (style.transform !== undefined) {
    //   processTransform(layer, layout, style.transform);
    // }

    const opacity = style.opacity !== undefined ? style.opacity : DEFAULT_OPACITY;

    return {
      ...layerGroup(layout.left, layout.top, layout.width, layout.height, opacity),
      name: props.name || this.getDefaultGroupName(props, value),
    };
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): Array<SketchJSON> {
    return [];
  }
}

module.exports = SketchRenderer;
