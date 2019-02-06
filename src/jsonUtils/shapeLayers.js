// @flow
import type { SJFill, SJPath, SJRect, SJShapeGroupLayer } from 'sketchapp-json-flow-types';
import { BorderPosition } from 'sketch-constants';
import makeResizeConstraint from './resizeConstraint';
import { generateID, makeRect, makeColorFromCSS } from './models';
import { makeStyle } from './style';
import type { Color, ResizeConstraints, ViewStyle } from '../types';

type Radii = Array<number>;

export const makeHorizontalPath = (): SJPath => ({
  _class: 'path',
  isClosed: false,
  points: [
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 0.5}',
    },
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 0.5}',
    },
  ],
});

export const makeVerticalPath = (): SJPath => ({
  _class: 'path',
  isClosed: false,
  points: [
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 0}',
    },
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 1}',
    },
  ],
});

export const makeRectPath = (radii: Radii = [0, 0, 0, 0]): SJPath => {
  const [r0, r1, r2, r3] = radii;
  return {
    _class: 'path',
    isClosed: true,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: r0,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: r1,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: r2,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: r3,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ],
  };
};

export const makeShapePath = (
  frame: SJRect,
  path: SJPath,
  resizingConstraint?: ResizeConstraints,
) => ({
  _class: 'shapePath',
  frame,
  do_objectID: generateID(),
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name: 'Path',
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  booleanOperation: -1,
  edited: false,
  path,
});

export const makeRectShapeLayer = (
  x: number,
  y: number,
  width: number,
  height: number,
  radii: Radii = [0, 0, 0, 0],
  resizingConstraint: ?ResizeConstraints,
) => {
  const fixedRadius = radii[0] || 0;
  const path = makeRectPath(radii);
  return {
    ...path,
    _class: 'rectangle',
    do_objectID: generateID(),
    frame: makeRect(x, y, width, height),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: 'Path',
    nameIsFixed: false,
    resizingConstraint: makeResizeConstraint(resizingConstraint),
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    booleanOperation: -1,
    edited: false,
    path,
    fixedRadius,
    hasConvertedToNewRoundCorners: true,
  };
};

export const makeShapeGroup = (
  frame: SJRect,
  layers: Array<any> = [],
  style?: ViewStyle,
  shadows?: Array<ViewStyle>,
  fills?: Array<SJFill>,
  resizingConstraint?: ResizeConstraints,
): SJShapeGroupLayer => ({
  _class: 'shapeGroup',
  do_objectID: generateID(),
  frame,
  isLocked: false,
  isVisible: true,
  name: 'ShapeGroup',
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  style: makeStyle(style, fills, shadows),
  hasClickThrough: false,
  layers,
  clippingMaskMode: 0,
  hasClippingMask: false,
  windingRule: 1,
});

export const makeVerticalBorder = (
  x: number,
  y: number,
  length: number,
  thickness: number,
  color: Color,
): SJShapeGroupLayer => {
  const frame = makeRect(x, y, thickness, length);
  const shapeFrame = makeRect(0, 0, thickness, length);
  const shapePath = makeShapePath(shapeFrame, makeVerticalPath());
  const content = makeShapeGroup(frame, [shapePath]);
  content.style.borders = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: 0,
      position: BorderPosition.Center,
      thickness,
    },
  ];
  return content;
};

export const makeHorizontalBorder = (
  x: number,
  y: number,
  length: number,
  thickness: number,
  color: Color,
): SJShapeGroupLayer => {
  const frame = makeRect(x, y, length, thickness);
  const shapeFrame = makeRect(0, 0, length, thickness);
  const shapePath = makeShapePath(shapeFrame, makeHorizontalPath());
  const content = makeShapeGroup(frame, [shapePath]);
  content.style.borders = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: 0,
      position: BorderPosition.Center,
      thickness,
    },
  ];
  return content;
};
