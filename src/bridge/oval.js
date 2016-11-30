/* @flow */
import frameFromProps from './frame';
import shapeGroup from './shapeGroup';

export type Oval = {
  name?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  locked?: boolean,
  backgroundColor?: string,
}

export const oval = (props: Oval) => {
  const ovalShape = MSOvalShape.alloc().init();
  ovalShape.frame = frameFromProps(props);

  const layer = shapeGroup(ovalShape, props);

  if (props.locked) {
    layer.setIsLocked(true);
  }

  return layer;
};

export default oval;
