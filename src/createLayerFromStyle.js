import convertToColor from './utils/convertToColor';
import findFont from './utils/findFont';
import type { SketchLayer, TextStyle } from './types';

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

function createLayerFromStyle(name: string, textStyle: TextStyle): SketchLayer {
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

export default createLayerFromStyle;
