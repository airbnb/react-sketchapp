import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { Point } from './types';

export function describePoint(point: Point): string {
  const { x, y } = point;
  return `{${x}, ${y}}`;
}

export function makeCurvePoint(
  point: Point,
  curveFrom?: Point,
  curveTo?: Point,
  curveMode?: FileFormat.CurveMode,
): FileFormat.CurvePoint {
  return {
    _class: 'curvePoint',
    cornerRadius: 0,
    curveFrom: describePoint(curveFrom || point),
    curveMode: curveMode || 0,
    curveTo: describePoint(curveTo || point),
    hasCurveFrom: !!curveFrom,
    hasCurveTo: !!curveTo,
    point: describePoint(point),
  };
}
