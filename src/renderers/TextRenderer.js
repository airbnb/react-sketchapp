/* @flow */
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import ViewRenderer from './ViewRenderer';
import findFont from '../utils/findFont';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
import hashStyle from '../utils/hashStyle';

const TEXT_ALIGN = {
  auto: 0,
  left: 0,
  right: 1,
  center: 2,
  justify: 3,
};

const TEXT_BEHAVIOR = {
  auto: 0,
  fixed: 1,
};

class TextRenderer extends SketchRenderer {
  getDefaultGroupName(props: any, value: ?string) {
    return value || 'Text';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    value: ?string
  ): Array<SketchLayer> {
    if (value === null) {
      const viewRenderer = new ViewRenderer();
      return viewRenderer.renderBackingLayers(layout, style, textStyle, props, value);
    }

    const layer = MSTextLayer
      .alloc()
      .initWithFrame_(NSMakeRect(layout.left, layout.top, layout.width, layout.height));

    // Text Value
    layer.setStringValue(value);
    layer.setName(value);

    const hash = hashStyle(textStyle);
    if (global.result && Object.keys(global.result).includes(hash)) {
      layer.style = global.result[hash];
      return [layer];
    }

    // Styling
    const font = findFont(textStyle);
    layer.setFont(font);

    if (textStyle.color !== undefined) {
      layer.setTextColor(convertToColor(textStyle.color));
    }

    if (textStyle.lineHeight !== undefined) {
      layer.setLineHeight(textStyle.lineHeight);
    }

    if (textStyle.letterSpacing !== undefined) {
      layer.setCharacterSpacing(textStyle.letterSpacing);
    }

    if (textStyle.textAlign) {
      layer.setTextAlignment(TEXT_ALIGN[textStyle.textAlign]);
    }

    if (style.opacity !== undefined) {
      layer.style().contextSettings().opacity = style.opacity;
    }

    // note european spelling :P
    layer.setTextBehaviour(TEXT_BEHAVIOR.fixed);

    layer.frame().setWidth(layout.width);
    layer.frame().setHeight(layout.height);

    // TODO: fontWeight

    return [layer];
  }
}

module.exports = TextRenderer;
