// @flow
import { SKETCH_VERSION_COMPATIBILITY } from './constants';

// Verify Sketch version is compatible
// eslint-disable-next-line
export const sketchVersionIsCompatible = (): boolean => {
  const sketch = context.api();
  return sketch._metadata.appVersion >= SKETCH_VERSION_COMPATIBILITY;
};
