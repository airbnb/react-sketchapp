import { getSketchVersion } from './getSketchVersion';

export function isRunningInSketch() {
  return getSketchVersion() !== 'NodeJS';
}
