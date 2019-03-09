import type { SJCurveMode, SJCurvePoint } from 'sketchapp-json-flow-types';
import type { Point } from './types';

export function describePoint(point: Point): string {
  const { x, y } = point;
  return `{${x}, ${y}}`;
}

export function makeCurvePoint(
  point: Point,
  curveFrom?: Point,
  curveTo?: Point,
  curveMode: SJCurveMode,
): SJCurvePoint {
  return {
    _class: 'curvePoint',
    cornerRadius: 0,
    curveFrom: describePoint(curveFrom || point),
    curveMode,
    curveTo: describePoint(curveTo || point),
    hasCurveFrom: !!curveFrom,
    hasCurveTo: !!curveTo,
    point: describePoint(point),
  };
}
