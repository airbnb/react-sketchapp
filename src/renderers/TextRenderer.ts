import { SketchRenderer } from './SketchRenderer';
import { TreeNode } from '../types';
import { makeTextLayer } from '../jsonUtils/textLayers';
import { makeRect } from '../jsonUtils/models';
import { TextStyles } from '../sharedStyles/TextStyles';
import { Props } from '../components/Text';

export class TextRenderer extends SketchRenderer {
  getDefaultGroupName(props: Props) {
    return props.name || 'Text';
  }

  renderBackingLayers({ layout, style, textStyle, props }: TreeNode<Props>) {
    // Append all text nodes's content into one string if name is missing
    const resolvedName = props.name
      ? props.name
      : props.textNodes.map((textNode) => textNode.content).join('');

    const frame = makeRect(0, 0, layout.width, layout.height);
    const layer = makeTextLayer(this.platformBridge)(
      frame,
      resolvedName,
      props.textNodes,
      style,
      props.resizingConstraint,
      props.shadows,
    );

    const resolvedTextStyle = TextStyles(() => this.platformBridge).resolve(textStyle);
    if (resolvedTextStyle) {
      if (!layer.style) {
        layer.style = resolvedTextStyle.sketchStyle;
      }
      layer.sharedStyleID = resolvedTextStyle.sharedObjectID;
    }

    return [layer];
  }
}
