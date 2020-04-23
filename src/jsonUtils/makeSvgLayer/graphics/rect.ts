import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeRect } from '../../models';
import { Point, Size } from './types';

export function makeBoundingRectFromPoints(points: Point[]): FileFormat.Rect {
  const x = Math.min(...points.map((point) => point.x));
  const y = Math.min(...points.map((point) => point.y));
  const width = Math.max(...points.map((point) => point.x)) - x;
  const height = Math.max(...points.map((point) => point.y)) - y;

  return makeRect(x, y, width, height);
}

export function makeBoundingRectFromCommands(commands: any): FileFormat.Rect {
  const points: Point[] = commands.reduce((acc: Point[], command: any) => {
    const { type, data } = command;

    switch (type) {
      case 'line':
      case 'move': {
        const { to } = data;
        return [...acc, to];
      }
      case 'cubicCurve': {
        const { to, controlPoint1, controlPoint2 } = data;
        return [...acc, to, controlPoint1, controlPoint2];
      }
      case 'close':
        return acc;
      default:
        throw new Error(`Invalid SVG path command: ${type}`);
    }
  }, []);

  return makeBoundingRectFromPoints(points);
}

export function unionRects(...rects: FileFormat.Rect[]): FileFormat.Rect {
  function union(a: FileFormat.Rect, b: FileFormat.Rect) {
    const minX = Math.min(a.x, b.x);
    const minY = Math.min(a.y, b.y);
    const maxX = Math.max(a.x + a.width, b.x + b.width);
    const maxY = Math.max(a.y + a.height, b.y + b.height);

    return makeRect(minX, minY, maxX - minX, maxY - minY);
  }

  if (rects.length === 0) {
    throw new Error('No rects to union');
  }

  return rects.reduce((acc, rect) => union(acc, rect), rects[0]);
}

export function scaleRect(rect: FileFormat.Rect, scale: number) {
  return makeRect(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale);
}

// Port of Lona's resizing algorithm
// https://github.com/airbnb/Lona/blob/94fd0b26de3e3f4b4496cdaa4ab31c6d258dc4ac/examples/generated/test/swift/CGSize%2BResizing.swift
export function resize(
  source: Size,
  destination: Size,
  resizingMode: 'cover' | 'contain' | 'stretch',
) {
  const newSize = { ...destination };

  const sourceAspectRatio = source.height / source.width;
  const destinationAspectRatio = destination.height / destination.width;

  const sourceIsWiderThanDestination = sourceAspectRatio < destinationAspectRatio;

  switch (resizingMode) {
    case 'contain':
      if (sourceIsWiderThanDestination) {
        newSize.height = destination.width * sourceAspectRatio;
      } else {
        newSize.width = destination.height / sourceAspectRatio;
      }
      break;
    case 'cover':
      if (sourceIsWiderThanDestination) {
        newSize.width = destination.height / sourceAspectRatio;
      } else {
        newSize.height = destination.width * sourceAspectRatio;
      }
      break;
    case 'stretch':
      break;
    default:
      throw new Error('Invalid resizing mode');
  }

  return makeRect(
    (destination.width - newSize.width) / 2.0,
    (destination.height - newSize.height) / 2.0,
    newSize.width,
    newSize.height,
  );
}
