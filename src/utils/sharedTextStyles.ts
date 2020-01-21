import SketchStyles from '../jsonUtils/sketchImpl/sharedTextStyles';
import NodeStyles from '../jsonUtils/nodeImpl/sharedTextStyles';
import isRunningInSketch from './isRunningInSketch';

export default isRunningInSketch() ? new NodeStyles() : new SketchStyles();
