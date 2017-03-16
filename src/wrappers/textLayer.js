/* @flow */

type Frame = {
  left: number,
  top: number,
  width: number,
  height: number,
};

export default (name: ?string, layout: Frame) => {
  const layer = MSTextLayer.alloc().initWithFrame_(
    NSMakeRect(layout.left, layout.top, layout.width, layout.height),
  );

  layer.setStringValue(name);
  layer.setName(name);

  return layer;
};
