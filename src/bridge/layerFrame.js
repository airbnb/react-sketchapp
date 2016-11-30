/* @flow */
import rectangle from './rectangle';

// TODO: this would be great as a component
export type LayerFrame = {
  layer: any,
  padding?: number,
  backgroundColor?: string,
  locked?: boolean,
}
const layerFrame = ({
  layer,
  padding = 10,
  locked = false,
  backgroundColor = '#ffffff',
}: LayerFrame) => {
  const props = {
    name: `${layer.name()} BG`,
    x: layer.frame().x() - padding,
    y: layer.frame().y() - padding,
    width: layer.frame().width() + (padding * 2),
    height: layer.frame().height() + (padding * 2),
    locked,
    backgroundColor,
  };

  return rectangle(props);
};

export default layerFrame;
