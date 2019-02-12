// @flow
import type { SJShapeGroupLayer } from 'sketchapp-json-flow-types';
import type { LayoutInfo } from '../types';
import getSketchVersion from '../utils/getSketchVersion';
import sketchMethod from './sketchImpl/makeSvgLayer';
import nodeMethod from './nodeImpl/makeSvgLayer';

const makeSvgLayer = (layout: LayoutInfo, name: string, svg: string): SJShapeGroupLayer => {
  if (getSketchVersion() === 'NodeJS') {
    return nodeMethod(layout, name, svg);
  }
  return sketchMethod(layout, name, svg);
};

export default makeSvgLayer;
