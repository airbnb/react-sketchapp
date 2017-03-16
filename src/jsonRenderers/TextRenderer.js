/* @flow */
import SketchRenderer from './SketchRenderer';
import ViewRenderer from './ViewRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
// import TextStyles from '../sharedStyles/TextStyles';
import makeTextLayer from '../jsonUtils/textLayers';
import { makeRect } from '../jsonUtils/models';
// import applyTextStyleToLayer from '../utils/applyTextStyleToLayer';
// import textLayer from '../wrappers/textLayer';

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

    // TODO(gold): reimplement resolveStyle
    // NOTE(akp): This is a sketch api. Naughty :((
    // const resolvedStyle = TextStyles.resolve(textStyle);

    // let layer = textLayer(value, layout);
    // if (resolvedStyle) {
    //   layer.style = resolvedStyle;
    //   return [layer];
    // }

    return [layer];
  }
}

module.exports = TextRenderer;
