import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';

import { normalizePointInRect } from './point';
import { makeCurvePoint, describePoint } from './curvePoint';

type Path = Pick<FileFormat.ShapePath, 'isClosed' | 'points'>;

function makePath(curvePoints: FileFormat.CurvePoint[], isClosed: boolean): Path {
  return {
    isClosed,
    points: curvePoints,
  };
}

// Points are normalized between 0 and 1, relative to the frame.
// We use the original frame here and can scale it later.
//
// This is a rough port of Lona's PDF to Sketch path conversion
// https://github.com/airbnb/Lona/blob/94fd0b26de3e3f4b4496cdaa4ab31c6d258dc4ac/studio/LonaStudio/Utils/Sketch.swift#L285
export function makePathsFromCommands(
  commands: { type: string; data: any }[],
  frame: FileFormat.Rect,
): Path[] {
  const paths: Path[] = [];
  let curvePoints: FileFormat.CurvePoint[] = [];

  function finishPath(isClosed: boolean) {
    if (curvePoints.length === 0) return;

    const path = makePath(curvePoints, isClosed);
    paths.push(path);

    curvePoints = [];
  }

  commands.forEach((command: any) => {
    const { type, data } = command;

    switch (type) {
      case 'move': {
        finishPath(false);

        const { to } = data;
        const curvePoint = makeCurvePoint(normalizePointInRect(to, frame), undefined, undefined, 1);
        curvePoints.push(curvePoint);
        break;
      }
      case 'line': {
        const { to } = data;
        const curvePoint = makeCurvePoint(normalizePointInRect(to, frame), undefined, undefined, 1);
        curvePoints.push(curvePoint);
        break;
      }
      case 'cubicCurve': {
        const { to, controlPoint1, controlPoint2 } = data;

        if (curvePoints.length > 0) {
          const last = curvePoints[curvePoints.length - 1];
          last.curveFrom = describePoint(normalizePointInRect(controlPoint1, frame));
          last.curveMode = 2;
          last.hasCurveFrom = true;
        }

        const curvePoint = makeCurvePoint(
          normalizePointInRect(to, frame),
          undefined,
          normalizePointInRect(controlPoint2, frame),
          2,
        );

        curvePoints.push(curvePoint);
        break;
      }
      case 'close': {
        // If first and last points are equal, combine them
        if (curvePoints.length > 0) {
          const first = curvePoints[0];
          const last = curvePoints[curvePoints.length - 1];

          if (first.point == last.point && last.hasCurveTo) {
            first.curveTo = last.curveTo;
            first.hasCurveTo = last.hasCurveTo;
            first.curveMode = 2;

            curvePoints.pop();
          }
        }

        finishPath(true);
        break;
      }
      default:
        throw new Error(`Invalid SVG path command: ${type}`);
    }
  });

  finishPath(false);

  return paths;
}

export function makeLineCapStyle(strokeLineCap: 'butt' | 'round' | 'square'): 0 | 1 | 2 {
  switch (strokeLineCap) {
    case 'butt':
      return 0;
    case 'round':
      return 1;
    case 'square':
      return 2;
    default:
      throw new Error(`Invalid SVG stroke line cap: ${strokeLineCap}`);
  }
}
