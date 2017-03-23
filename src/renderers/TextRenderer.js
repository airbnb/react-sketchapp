/* @flow */
import SketchRenderer from './SketchRenderer';
import ViewRenderer from './ViewRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
// import TextStyles from '../sharedStyles/TextStyles';
import applyTextStyleToLayer from '../utils/applyTextStyleToLayer';
import textLayer from '../wrappers/textLayer';

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

    let layer = textLayer(value, layout);

    // const resolvedStyle = TextStyles.resolve(textStyle);
    //
    // if (resolvedStyle) {
    //   layer.style = resolvedStyle;
    //   return [layer];
    // }

    layer = applyTextStyleToLayer(layer, textStyle, style);

    layer.frame().setWidth(layout.width);
    layer.frame().setHeight(layout.height);

    return [layer];
  }
}

module.exports = TextRenderer;
