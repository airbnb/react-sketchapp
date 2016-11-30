/* @flow */
import colorFromString from './color';

export const alignment = {
  left: 0,
  right: 1,
  center: 2,
  full: 3,
};

export type Text = {
  name?: string,
  value: string,
  uppercase?: boolean,
  fontFamily: string,
  fontSize: number,
  color?: string,
  lineHeight?: number,
  opacity?: number,
  x?: number,
  y?: number,
  letterSpacing?: number,
  align?: 'left' | 'right' | 'center' | 'full',
  locked?: boolean,
}
export const text = (props: Text): any => {
  const layer = MSTextLayer.alloc().init();

  let value = props.value;
  if (props.uppercase) {
    value = props.value.toUpperCase();
  }

  layer.setStringValue(value);

  layer.setName(props.name || value);

  const font = NSFont.fontWithName_size(props.fontFamily, props.fontSize);
  layer.setFont(font);

  if (props.color) {
    layer.setTextColor(colorFromString(props.color));
  }

  if (props.lineHeight) {
    layer.setLineHeight(props.lineHeight);
  }

  if (props.x) {
    const frame = layer.frame();
    frame.setX(props.x);
  }

  if (props.y) {
    const frame = layer.frame();
    frame.setY(props.y);
  }

  if (props.letterSpacing) {
    layer.setCharacterSpacing(props.letterSpacing);
  }

  if (props.align) {
    layer.setTextAlignment(alignment[props.align]);
  }

  if (props.locked) {
    layer.setIsLocked(true);
  }

  if (props.opacity) {
    layer.style().contextSettings().opacity = props.opacity;
  }

  return layer;
};

export const addTextStyleFromLayer = (styles: any, layer: any) =>
  styles.addSharedStyleWithName_firstInstance(layer.name(), layer.style());

export default text;
