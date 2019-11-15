import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import layerGroup from '../jsonUtils/layerGroup';
import hotspotLayer from '../jsonUtils/hotspotLayer';
import { TreeNode } from '../types';
import processTransform from '../utils/processTransform';

const DEFAULT_OPACITY = 1.0;

export default class SketchRenderer {
  getDefaultGroupName(_props: any) {
    return 'Group';
  }

  renderGroupLayer({
    layout,
    style,
    props,
  }: TreeNode): FileFormat.AnyGroup | FileFormat.SymbolInstance {
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

  renderBackingLayers(_node: TreeNode): FileFormat.AnyLayer[] {
    return [];
  }
}
