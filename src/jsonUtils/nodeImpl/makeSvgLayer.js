import type { LayoutInfo } from '../../types';
import { makeRectShapeLayer } from '../shapeLayers';

// TODO:
export default function makeSvgLayer(layout: LayoutInfo, name: string /* , svg: string */) {
  const shape = makeRectShapeLayer(0, 0, layout.width, layout.height);
  shape.name = name;
  return shape;
}
