// @flow
import { SKETCH_LOWEST_COMPATIBLE_APP_VERSION } from './constants';

// Verify Sketch app version is compatible
// eslint-disable-next-line
export const sketchVersionIsCompatible = (): boolean => {
  const sketch = context.api();
  return sketch._metadata.appVersion >= SKETCH_LOWEST_COMPATIBLE_APP_VERSION;
};
