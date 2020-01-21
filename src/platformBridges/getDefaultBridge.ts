import isRunningInSketch from '../utils/isRunningInSketch';
import { PlatformBridge } from '../types';
import SketchBridge from './SketchBridge';
import weakRequire from '../utils/weakRequire';

export default function getDefaultBridge(): PlatformBridge {
  return isRunningInSketch() ? SketchBridge : weakRequire(module, './NodeMacOSBridge');
}
