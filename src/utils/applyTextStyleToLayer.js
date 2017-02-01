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

const TEXT_TRANSFORM = {
  uppercase: 1,
  lowercase: 2,
  initial: 0,
  inherit: 0,
  none: 0,
  capitalize: 0,
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

  if (textStyle.textTransform) {
    layer.addAttribute_value(
      'MSAttributedStringTextTransformAttribute',
      TEXT_TRANSFORM[textStyle.textTransform] * 1,
    );
  }

  // note european spelling :P
  layer.setTextBehaviour(TextBehaviour.Fixed);

  return layer;
}

export default applyTextStyleToLayer;
