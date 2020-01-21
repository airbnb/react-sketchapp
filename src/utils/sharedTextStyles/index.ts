import SketchTextStyles from './TextStyles.sketch';
import PureJsTextStyles from './TextStyles';
import isRunningInSketch from '../isRunningInSketch';

export default isRunningInSketch() ? new PureJsTextStyles() : new SketchTextStyles();
