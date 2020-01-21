import getSketchVersion from './getSketchVersion';

export default function isRunningInSketch() {
  return getSketchVersion() !== '';
}
