import isRunningInSketch from '../../utils/isRunningInSketch';
import sketchMakeSvgLayer from './makeSvgLayer.sketch';
import pureJsSketchMakeSvgLayer from './makeSvgLayer';

export default isRunningInSketch() ? sketchMakeSvgLayer : pureJsSketchMakeSvgLayer;
