/* @flow */
import colorFromString from './color';

type ShapeGroup = {
  backgroundColor?: string,
  name?: string
}

const shapeGroup = (
  shape: MSRectangleShape | MSOvalShape,
  props: ShapeGroup,
) => {
  const group = MSShapeGroup.shapeWithPath(shape);
  const style = group.style().addStylePartOfType(0);
  style.color = colorFromString(props.backgroundColor || '#000');

  if (props.name) {
    group.name = props.name;
  }

  return group;
};

export default shapeGroup;
