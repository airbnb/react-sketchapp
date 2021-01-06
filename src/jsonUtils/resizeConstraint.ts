import { ResizeConstraints } from '../types';

/*
  RESIZE CONSTRAINT RULES

  Order of properties as map keys:
  1. top
  2. right
  3. bottom
  4: left
  5. fixedHeight
  6. fixedWidth
 */

const RESIZE_CONSTRAINTS: { [key: string]: number } = {
  top_left_fixedHeight_fixedWidth: 9,
  top_right_left_fixedHeight: 10,
  top_left_fixedHeight: 11,
  top_right_fixedHeight_fixedWidth: 12,
  top_fixedHeight_fixedWidth: 13,
  top_right_fixedHeight: 14,
  top_fixedHeight: 15,
  top_bottom_left_fixedWidth: 17,
  top_right_bottom_left: 18,
  top_bottom_left: 19,
  top_right_bottom_fixedWidth: 20,
  top_bottom_fixedWidth: 21,
  top_right_bottom: 22,
  top_bottom: 23,
  top_left_fixedWidth: 25,
  top_right_left: 26,
  top_left: 27,
  top_right_fixedWidth: 28,
  top_fixedWidth: 29,
  top_right: 30,
  top: 31,
  bottom_left_fixedHeight_fixedWidth: 33,
  right_bottom_left_fixedHeight: 34,
  bottom_left_fixedHeight: 35,
  right_bottom_fixedHeight_fixedWidth: 36,
  bottom_fixedHeight_fixedWidth: 37,
  right_bottom_fixedHeight: 38,
  bottom_fixedHeight: 39,
  left_fixedHeight_fixedWidth: 41,
  right_left_fixedHeight: 42,
  left_fixedHeight: 43,
  right_fixedHeight_fixedWidth: 44,
  fixedHeight_fixedWidth: 45,
  right_fixedHeight: 46,
  fixedHeight: 47,
  bottom_left_fixedWidth: 49,
  right_bottom_left: 50,
  bottom_left: 51,
  right_bottom_fixedWidth: 52,
  bottom_fixedWidth: 53,
  right_bottom: 54,
  bottom: 55,
  left_fixedWidth: 57,
  right_left: 58,
  left: 59,
  right_fixedWidth: 60,
  fixedWidth: 61,
  right: 62,
  none: 63,
};

export function makeResizeConstraint(resizingConstraint?: ResizeConstraints | null): number {
  if (resizingConstraint) {
    const constraints = [];
    const { top, right, bottom, left, fixedHeight, fixedWidth } = resizingConstraint;

    if (top) {
      constraints.push('top');
    }
    if (right) {
      constraints.push('right');
    }
    if (bottom) {
      constraints.push('bottom');
    }
    if (left) {
      constraints.push('left');
    }
    if (fixedHeight) {
      constraints.push('fixedHeight');
    }
    if (fixedWidth) {
      constraints.push('fixedWidth');
    }

    if (constraints.length > 0) {
      const constraint = RESIZE_CONSTRAINTS[constraints.join('_')];
      if (!constraint) {
        throw new Error(
          `\n${JSON.stringify(
            resizingConstraint,
            null,
            2,
          )}\nconstraint is not a valid combination.`,
        );
      }
      return constraint;
    }
  }

  return RESIZE_CONSTRAINTS.none; // No constraints
}
