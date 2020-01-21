import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { Point } from './types';

export function normalizePointInRect(point: Point, rect: FileFormat.Rect): Point {
  const x = (point.x - rect.x) / rect.width;
  const y = (point.y - rect.y) / rect.height;
  return { x, y };
}
