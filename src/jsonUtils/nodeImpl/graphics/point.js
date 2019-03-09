import type { SJRect } from 'sketchapp-json-flow-types';
import type { Point } from './types';

// eslint-disable-next-line import/prefer-default-export
export function normalizePointInRect(point: Point, rect: SJRect): Point {
  const x = (point.x - rect.x) / rect.width;
  const y = (point.y - rect.y) / rect.height;
  return { x, y };
}
