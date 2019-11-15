import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import makeTextLayer from '../jsonUtils/textLayers';
import { makeRect } from '../jsonUtils/models';
import TextStyles from '../sharedStyles/TextStyles';
import { Props } from '../components/Text';

export default class TextRenderer extends SketchRenderer {
  getDefaultGroupName(props: Props) {
    return props.name || 'Text';
  }

  renderBackingLayers({ layout, style, textStyle, props }: TreeNode<Props>): FileFormat.Text[] {
    let { name } = props;

    // Append all text nodes's content into one string
    if (!name && props.textNodes) {
      name = '';
      props.textNodes.forEach(textNode => {
        name += textNode.content;
      });
    }

    const frame = makeRect(0, 0, layout.width, layout.height);
    const layer = makeTextLayer(
      frame,
      name,
      props.textNodes,
      style,
      props.resizingConstraint,
      props.shadows,
    );

    const resolvedTextStyle = TextStyles.resolve(textStyle);
    if (resolvedTextStyle) {
      if (!layer.style) {
        layer.style = resolvedTextStyle.sketchStyle;
      }
      // @ts-ignore
      layer.sharedStyleID = resolvedTextStyle.sharedObjectID;
    }

    return [layer];
  }
}
