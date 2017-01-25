import { TextAlignment, TextBehaviour } from 'sketch-constants';
import convertToColor from './convertToColor';
import findFont from './findFont';
import type { SketchLayer, TextStyle, ViewStyle } from '../types';

const TEXT_ALIGN = {
  auto: TextAlignment.Left,
  left: TextAlignment.Left,
  right: TextAlignment.Right,
  center: TextAlignment.Center,
  justify: TextAlignment.Justified,
};

function applyTextStyleToLayer(
  layer: SketchLayer,
  textStyle: TextStyle,
  style: ViewStyle,
): SketchLayer {
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

  if (style && style.opacity !== undefined) {
    layer.style().contextSettings().opacity = style.opacity; //eslint-disable-line
  }

  // note european spelling :P
  layer.setTextBehaviour(TextBehaviour.Fixed);

  return layer;
}

export default applyTextStyleToLayer;
