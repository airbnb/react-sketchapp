import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { LayoutInfo } from '../types';
import isRunningInSketch from '../utils/isRunningInSketch';
import sketchMethod from './sketchImpl/makeSvgLayer';
import nodeMethod from './nodeImpl/makeSvgLayer';

const makeSvgLayer = (layout: LayoutInfo, name: string, svg: string): FileFormat.Group => {
  return isRunningInSketch() ? sketchMethod(layout, name, svg) : nodeMethod(layout, name, svg);
};

export default makeSvgLayer;
