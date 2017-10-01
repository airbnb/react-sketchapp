/* @flow */
import SketchRenderer from './SketchRenderer';
import ViewRenderer from './ViewRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
import makeTextLayer from '../jsonUtils/textLayers';
import { makeRect } from '../jsonUtils/models';
import TextStyles from '../sharedStyles/TextStyles';

class TextRenderer extends SketchRenderer {
  getDefaultGroupName(props: any) {
    return props.name || 'Text';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any
  ): Array<SketchLayer> {
    // Append all text nodes's content into one string
    let name = '';
    props.textNodes.forEach((textNode) => {
      name += textNode.content;
    });
    if (name === '') {
      const viewRenderer = new ViewRenderer();
      return viewRenderer.renderBackingLayers(
        layout,
        style,
        textStyle,
        props,
        name
      );
    }

    const frame = makeRect(0, 0, layout.width, layout.height);
    const layer = makeTextLayer(frame, name, props.textNodes);

    const resolvedStyle = TextStyles.resolve(textStyle);
    if (resolvedStyle) {
      layer.style = resolvedStyle.sketchStyle;
      layer.style.sharedObjectID = resolvedStyle.sharedObjectID;
    }

    return [layer];
  }
}

module.exports = TextRenderer;
