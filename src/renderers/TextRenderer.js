/* @flow */
import SketchRenderer from './SketchRenderer';
import ViewRenderer from './ViewRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
import makeTextLayer from '../jsonUtils/textLayers';
import { makeRect } from '../jsonUtils/models';
import TextStyles from '../sharedStyles/TextStyles';

class TextRenderer extends SketchRenderer {
  getDefaultGroupName(props: any, value: ?string) {
    return value || 'Text';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    value: ?string,
  ): Array<SketchLayer> {
    if (value === null) {
      const viewRenderer = new ViewRenderer();
      return viewRenderer.renderBackingLayers(layout, style, textStyle, props, value);
    }

    const frame = makeRect(0, 0, layout.width, layout.height);
    const layer = makeTextLayer(frame, value, textStyle);

    const resolvedStyle = TextStyles.resolve(textStyle);
    if (resolvedStyle) {
      layer.style = resolvedStyle.sketchStyle;
      layer.style.sharedObjectID = resolvedStyle.sharedObjectID;
    }

    return [layer];
  }
}

module.exports = TextRenderer;
