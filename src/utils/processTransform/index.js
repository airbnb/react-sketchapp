// @flow
import type { LayoutInfo, ViewStyle } from '../../types';
import parseTransformProp from './parseTransformProp';
import parseTransformOriginProp from './parseTransformOriginProp';

function closeEnough(a, b) {
  return Math.abs(a - b) < 0.01;
}

function isRotation(a, b, c, d) {
  return closeEnough(a, d) && closeEnough(c, -b) && closeEnough(a * d - c * b, 1);
}

const rad2deg = 180 / Math.PI;

function getRotation(a, b) {
  const possibleRotation = Math.acos(a);
  if (closeEnough(Math.sin(possibleRotation), b) || closeEnough(Math.sin(possibleRotation), -b)) {
    return possibleRotation * rad2deg;
  }
  return (possibleRotation + Math.PI) * rad2deg;
}

export default function(layout: LayoutInfo, props: ViewStyle) {
  if (!props.transform) {
    return {};
  }

  const origin = parseTransformOriginProp(layout, props.transformOrigin);
  const [a, b, c, d, tx, ty] = parseTransformProp(props.transform, origin);

  // apply translation
  /* eslint-disable no-param-reassign */
  layout.top += ty;
  layout.left += tx;
  /* eslint-enable */

  // look for a rotation
  if (isRotation(a, b, c, d)) {
    return {
      rotation: getRotation(a, b),
    };
  }

  // let's try to check if there is a reflection
  // we are going to apply the same reflection and see if the result is a rotation

  /**
   * check if flipped vertically
   * 1  0
   * 0 -1
   */
  let _a = a;
  let _b = -b;
  let _c = c;
  let _d = -d;

  if (isRotation(_a, _b, _c, _d)) {
    return {
      rotation: getRotation(_a, _b),
      isFlippedVertical: true,
    };
  }

  /**
   * check if flipped horizontally
   * -1 0
   *  0 1
   */
  _a = -a;
  _b = b;
  _c = -c;
  _d = d;

  if (isRotation(_a, _b, _c, _d)) {
    return {
      rotation: getRotation(_a, _b),
      isFlippedHorizontal: true,
    };
  }

  /**
   * no need to check if flipped vertically and horizontally since it's a rotation
   */

  // didn't find any rotation or reflection
  return {};
}
