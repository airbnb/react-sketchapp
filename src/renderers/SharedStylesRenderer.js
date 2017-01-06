/* @flow */
import SketchRenderer from './SketchRenderer';
import convertToColor from '../utils/convertToColor';
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

function createLayerFromStyle(name, textStyle) {
  const layer = MSTextLayer
    .alloc()
    .initWithFrame_(NSMakeRect(0, 0, 250, 50));

  // Text Value
  layer.setStringValue(name);

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

  // if (style.opacity !== undefined) {
  //   layer.style().contextSettings().opacity = style.opacity;
  // }

  // note european spelling :P
  layer.setTextBehaviour(TEXT_BEHAVIOR.fixed);

  return layer;
}

class SharedStylesRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): SketchLayer {
    if (props.clearExistingStyles) {
      global.sharedStyles.setObjects([]);
    }

    const result = {};
    if (props.styles) {
      Object.keys(props.styles).forEach((key) => {
        const st = props.styles[key];
        const layer = createLayerFromStyle(key, st);
        const className = hashStyle(st);
        global.sharedStyles.addSharedStyleWithName_firstInstance(key, layer.style());

        result[className] = layer.style();
      });
      global.result = result;
    }

    const layer = MSLayerGroup.alloc().init();

    layer.frame().setX(layout.left);
    layer.frame().setY(layout.top);
    layer.frame().setWidth(layout.width);
    layer.frame().setHeight(layout.height);

    if (props.name) {
      layer.setName(props.name);
    } else {
      layer.setName('SharedStyles');
    }

    return layer;
  }
}

module.exports = SharedStylesRenderer;
