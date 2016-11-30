/* @flow */
import frameFromProps from './frame';
import shapeGroup from './shapeGroup';

export type Rect = {
  name?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  radius?: number,
  locked?: boolean,
  backgroundColor?: string,
}

const rectangle = (props: Rect): any => {
  const rect = MSRectangleShape.alloc().init();
  rect.frame = frameFromProps(props);

  if (props.radius) {
    rect.cornerRadiusFloat = props.radius;
  }

  const layer = shapeGroup(rect, props);

  if (props.locked) {
    layer.setIsLocked(true);
  }

  return layer;
};

export default rectangle;
