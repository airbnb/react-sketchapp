import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeResizeConstraint } from './resizeConstraint';
import { generateID, makeRect, makeColorFromCSS, emptyGradient } from './models';
import { makeStyle } from './style';
import { Color, ResizeConstraints, ViewStyle } from '../types';

type Radii = (number | null)[];

export const makeHorizontalPath = (): Pick<FileFormat.ShapePath, 'isClosed' | 'points'> => ({
  isClosed: false,
  points: [
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: FileFormat.CurveMode.Straight,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 0.5}',
    },
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: FileFormat.CurveMode.Straight,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 0.5}',
    },
  ],
});

export const makeVerticalPath = (): Pick<FileFormat.ShapePath, 'isClosed' | 'points'> => ({
  isClosed: false,
  points: [
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: FileFormat.CurveMode.Straight,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 0}',
    },
    {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: FileFormat.CurveMode.Straight,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 1}',
    },
  ],
});

export const makeRectPath = (
  radii: Radii = [0, 0, 0, 0],
): Pick<FileFormat.ShapePath, 'isClosed' | 'points'> => {
  const [r0, r1, r2, r3] = radii;
  return {
    isClosed: true,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: r0 || 0,
        curveFrom: '{0, 0}',
        curveMode: FileFormat.CurveMode.Straight,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: r1 || 0,
        curveFrom: '{1, 0}',
        curveMode: FileFormat.CurveMode.Straight,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: r2 || 0,
        curveFrom: '{1, 1}',
        curveMode: FileFormat.CurveMode.Straight,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: r3 || 0,
        curveFrom: '{0, 1}',
        curveMode: FileFormat.CurveMode.Straight,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ],
  };
};

export const makeShapePath = (
  frame: FileFormat.Rect,
  path: Pick<FileFormat.ShapePath, 'isClosed' | 'points'>,
  resizingConstraint?: ResizeConstraints,
): FileFormat.ShapePath => ({
  _class: 'shapePath',
  frame,
  do_objectID: generateID(),
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
  name: 'Path',
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: FileFormat.ResizeType.Stretch,
  rotation: 0,
  shouldBreakMaskChain: false,
  booleanOperation: FileFormat.BooleanOperation.NA,
  edited: false,
  ...path,
  isFixedToViewport: false,
  pointRadiusBehaviour: FileFormat.PointsRadiusBehaviour.Rounded,
  exportOptions: {
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
  },
});

export const makeRectShapeLayer = (
  x: number,
  y: number,
  width: number,
  height: number,
  radii: Radii = [0, 0, 0, 0],
  resizingConstraint?: ResizeConstraints | null,
): FileFormat.Rectangle => {
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
    layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
    name: 'Path',
    nameIsFixed: false,
    resizingConstraint: makeResizeConstraint(resizingConstraint),
    resizingType: FileFormat.ResizeType.Stretch,
    rotation: 0,
    shouldBreakMaskChain: false,
    booleanOperation: FileFormat.BooleanOperation.NA,
    edited: false,
    fixedRadius,
    hasConvertedToNewRoundCorners: true,
    isFixedToViewport: false,
    pointRadiusBehaviour: FileFormat.PointsRadiusBehaviour.Rounded,
    exportOptions: {
      _class: 'exportOptions',
      exportFormats: [],
      includedLayerIds: [],
      layerOptions: 0,
      shouldTrim: false,
    },
  };
};

export const makeShapeGroup = (
  frame: FileFormat.Rect,
  layers: (
    | FileFormat.ShapePath
    | FileFormat.Rectangle
    | FileFormat.SymbolMaster
    | FileFormat.Group
    | FileFormat.Polygon
    | FileFormat.Star
    | FileFormat.Triangle
    | FileFormat.ShapeGroup
    | FileFormat.Text
    | FileFormat.SymbolInstance
    | FileFormat.Slice
    | FileFormat.Hotspot
    | FileFormat.Bitmap
  )[] = [],
  style?: ViewStyle,
  shadows?: (ViewStyle | undefined | null)[] | null,
  fills?: FileFormat.Fill[],
  resizingConstraint?: ResizeConstraints,
): FileFormat.ShapeGroup => ({
  _class: 'shapeGroup',
  do_objectID: generateID(),
  frame,
  isLocked: false,
  isVisible: true,
  name: 'ShapeGroup',
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: FileFormat.ResizeType.Stretch,
  rotation: 0,
  shouldBreakMaskChain: false,
  style: makeStyle(style, fills, shadows),
  hasClickThrough: false,
  layers,
  clippingMaskMode: 0,
  hasClippingMask: false,
  windingRule: FileFormat.WindingRule.EvenOdd,
  isFixedToViewport: false,
  exportOptions: {
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
  },
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  booleanOperation: FileFormat.BooleanOperation.NA,
  layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
});

export const makeVerticalBorder = (
  x: number,
  y: number,
  length: number,
  thickness: number,
  color: Color,
): FileFormat.ShapeGroup => {
  const frame = makeRect(x, y, thickness, length);
  const shapeFrame = makeRect(0, 0, thickness, length);
  const shapePath = makeShapePath(shapeFrame, makeVerticalPath());
  const content = makeShapeGroup(frame, [shapePath]);
  if (!content.style) {
    return content;
  }
  content.style.borders = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: FileFormat.FillType.Color,
      position: FileFormat.BorderPosition.Center,
      thickness,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: FileFormat.BlendMode.Normal,
        opacity: 1,
      },
      gradient: emptyGradient,
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
): FileFormat.ShapeGroup => {
  const frame = makeRect(x, y, length, thickness);
  const shapeFrame = makeRect(0, 0, length, thickness);
  const shapePath = makeShapePath(shapeFrame, makeHorizontalPath());
  const content = makeShapeGroup(frame, [shapePath]);
  if (!content.style) {
    return content;
  }
  content.style.borders = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: FileFormat.FillType.Color,
      position: FileFormat.BorderPosition.Center,
      thickness,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: FileFormat.BlendMode.Normal,
        opacity: 1,
      },
      gradient: emptyGradient,
    },
  ];
  return content;
};
