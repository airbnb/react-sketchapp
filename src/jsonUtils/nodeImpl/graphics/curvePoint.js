import type { Point } from './types';

// SJCurvePoint types copied from sketchapp-json-flow-types (they're not exported)
type PointString = string;
type CurveMode = 0 | 1 | 2 | 3 | 4;
export type SJCurvePoint = {|
  _class: 'curvePoint',
  cornerRadius: number,
  curveFrom: PointString,
  curveMode: CurveMode,
  curveTo: PointString,
  hasCurveFrom: boolean,
  hasCurveTo: boolean,
  point: PointString,
|};

export function describePoint(point: Point): string {
  const { x, y } = point;
  return `{${x}, ${y}}`;
}

export function makeCurvePoint(
  point: Point,
  curveFrom?: Point,
  curveTo?: Point,
  curveMode: CurveMode,
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
