/* @flow */
import layerGroup from '../jsonUtils/layerGroup';

import type { LayoutInfo, ViewStyle, TextStyle, SketchJSON, TreeNode } from '../types';

const DEFAULT_OPACITY = 1.0;

class SketchRenderer {
  getDefaultGroupName(
    // eslint-disable-next-line no-unused-vars
    props: any,
  ) {
    return 'Group';
  }
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
  ): SketchJSON {
    // Default SketchRenderer just renders an empty group

    // TODO(lmr): applying transform to the group would be ideal, but not sure if it's possible
    // if (style.transform !== undefined) {
    //   processTransform(layer, layout, style.transform);
    // }

    const opacity = style.opacity !== undefined ? style.opacity : DEFAULT_OPACITY;

    return {
      ...layerGroup(
        layout.left,
        layout.top,
        layout.width,
        layout.height,
        opacity,
        props.resizingConstraint,
      ),
      name: props.name || this.getDefaultGroupName(props),
    };
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    // eslint-disable-next-line no-unused-vars
    props: any,
    // eslint-disable-next-line no-unused-vars
    children: ?Array<TreeNode>,
  ): Array<SketchJSON> {
    return [];
  }
}

module.exports = SketchRenderer;
