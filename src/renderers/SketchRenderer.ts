import FileFormat from '@sketch-hq/sketch-file-format-ts';
import layerGroup from '../jsonUtils/layerGroup';
import hotspotLayer from '../jsonUtils/hotspotLayer';
import { LayoutInfo, ViewStyle, TextStyle, TreeNode } from '../types';
import processTransform from '../utils/processTransform';

const DEFAULT_OPACITY = 1.0;

export default class SketchRenderer {
  getDefaultGroupName(_props: any) {
    return 'Group';
  }

  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    _textStyle: TextStyle,
    props: any,
  ): FileFormat.AnyGroup | FileFormat.SymbolInstance {
    // Default SketchRenderer just renders an empty group

    const transform = processTransform(layout, style);

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
      ...transform,
      ...(props.flow && hotspotLayer(props.flow)),
    };
  }

  renderBackingLayers(
    _layout: LayoutInfo,
    _style: ViewStyle,
    _textStyle: TextStyle,
    _props: any,
    _children?: TreeNode[],
  ): FileFormat.AnyLayer[] {
    return [];
  }
}
