import { getSketchVersion } from './getSketchVersion';
import SketchStyles from '../jsonUtils/sketchImpl/sharedTextStyles';
import NodeStyles from '../jsonUtils/nodeImpl/sharedTextStyles';

export default getSketchVersion() === 'NodeJS' ? new NodeStyles() : new SketchStyles();
