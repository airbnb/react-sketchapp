/* @flow */
import frameFromProps from './frame';
import colorFromString from './color';

export type Artboard = {
  name?: string,
  children?: any,
  x?: number,
  y?: number,
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  backgroundColor?: string,
};
const artboard = (props: Artboard) => {
  const layer = MSArtboardGroup.alloc().init();

  const x = props.x || 0;
  const y = props.y || 0;
  const paddingTop = props.paddingTop || 0;
  const paddingRight = props.paddingRight || 0;
  const paddingBottom = props.paddingBottom || 0;
  const paddingLeft = props.paddingLeft || 0;
  // const children = props.children || [];

  if (props.name) {
    layer.setName(props.name);
  }

  if (props.children) {
    layer.addLayers(props.children);
    const childBounds = MSLayerGroup.groupBoundsForLayers(props.children);

    layer.frame = frameFromProps({
      x,
      y,
      width: childBounds.size.width + paddingLeft + paddingRight,
      height: childBounds.size.height + paddingTop + paddingBottom,
    });
  }

  if (props.backgroundColor) {
    const background = colorFromString(props.backgroundColor);
    layer.setBackgroundColor(background);
    layer.hasBackgroundColor = true;
  }

  // if (props.paddingRight) {
  //   const frame = layer.frame();
  //   frame.x = frame.x() - props.paddingRight;
  //   frame.width = frame.width() + props.paddingRight;
  // }
  //
  // if (props.paddingBottom) {
  //   const frame = layer.frame();
  //   frame.y = frame.y() - props.paddingBottom;
  //   frame.height = frame.height() + props.paddingBottom;
  // }

  return layer;
};

export default artboard;
