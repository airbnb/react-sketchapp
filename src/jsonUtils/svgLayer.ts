import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { LayoutInfo } from '../types';
import { getSketchVersion } from '../utils/getSketchVersion';
import sketchMethod from './sketchImpl/makeSvgLayer';
import nodeMethod from './nodeImpl/makeSvgLayer';

const makeSvgLayer = (layout: LayoutInfo, name: string, svg: string): FileFormat.Group => {
  if (getSketchVersion() === 'NodeJS') {
    return nodeMethod(layout, name, svg);
  }
  return sketchMethod(layout, name, svg);
};

export default makeSvgLayer;
