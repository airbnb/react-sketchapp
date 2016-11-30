/* @flow */

export type Group = {
  name?: string,
  x?: number,
  y?: number,
  locked?: boolean,
  clickThrough?: boolean,
  children: any[],
}

const group = (props: Group): any => {
  const layer = MSLayerGroup.alloc().init();

  if (props.name) {
    layer.name = props.name;
  }

  layer.addLayers(props.children);
  layer.resizeToFitChildrenWithOption(1);

  if (props.x) {
    const frame = layer.frame();
    frame.setX(frame.x() + props.x);
  }

  if (props.y) {
    const frame = layer.frame();
    frame.setY(frame.y() + props.y);
  }

  if (props.locked) {
    layer.setIsLocked(true);
  }

  if (props.clickThrough) {
    layer.setHasClickThrough(true);
  }

  return layer;
};

// TODO: need a better flow alias for layers
export const addLayerToGroup = (g: MSLayerGroup, layer: any) => {
  g.addLayers([
    layer,
  ]);
  return g;
};

export default group;
