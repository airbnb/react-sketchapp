import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { LayoutInfo, ViewStyle } from '../../types';
import { makeShapeGroup, makeShapePath } from '../shapeLayers';
import { makeRect } from '../models';
import { createUniformBorder } from '../borders';
import layerGroup from '../layerGroup';
import { makePathsFromCommands, makeLineCapStyle } from './graphics/path';
import { unionRects, scaleRect, makeBoundingRectFromCommands, resize } from './graphics/rect';
import requireSvgModel from './requireSvgModel';

function makeLayerFromPathElement(pathElement, _parentFrame: FileFormat.Rect, scale: number) {
  const {
    data: {
      params: { commands, style },
    },
  } = pathElement;

  // Paths are created using the original frame
  const pathFrame = makeBoundingRectFromCommands(commands);
  const paths = makePathsFromCommands(commands, pathFrame);

  // Scale the frame to fill the viewBox
  const shapeGroupFrame = scaleRect(pathFrame, scale);

  // Each shape path has an origin of {0, 0}, since the shapeGroup layer stores the real origin,
  // and we don't want to apply the origin translation twice.
  const shapePathFrame = makeRect(0, 0, shapeGroupFrame.width, shapeGroupFrame.height);

  const shapePaths = paths.map(path => makeShapePath(shapePathFrame, path));

  const viewStyle: ViewStyle = {};

  if (style.fill) {
    viewStyle.backgroundColor = style.fill;
  }

  const shapeGroup = makeShapeGroup(shapeGroupFrame, shapePaths, viewStyle);

  if (style.stroke) {
    const lineCap = makeLineCapStyle(style.strokeLineCap);
    const borderStyle = createUniformBorder(
      style.strokeWidth * scale,
      style.stroke,
      'solid',
      FileFormat.BorderPosition.Center,
      lineCap,
      lineCap,
    );
    shapeGroup.style = { ...shapeGroup.style, ...borderStyle };
  }

  return shapeGroup;
}

function makeLayerGroup(
  frame: FileFormat.Rect,
  layers: (
    | FileFormat.Group
    | FileFormat.Oval
    | FileFormat.Polygon
    | FileFormat.Rectangle
    | FileFormat.ShapePath
    | FileFormat.Star
    | FileFormat.Triangle
    | FileFormat.ShapeGroup
    | FileFormat.Text
    | FileFormat.SymbolMaster
    | FileFormat.SymbolInstance
    | FileFormat.Slice
    | FileFormat.Hotspot
    | FileFormat.Bitmap
  )[],
  name: string,
) {
  const group = layerGroup(frame.x, frame.y, frame.width, frame.height, 1);
  group.name = name;
  group.layers = layers;
  return group;
}

export default function makeSvgLayer(layout: LayoutInfo, name: string, svg: string) {
  const svgModel = requireSvgModel();

  const {
    data: { params, children },
  } = svgModel(svg);

  const {
    viewBox = {
      x: layout.left,
      y: layout.top,
      width: layout.width,
      height: layout.height,
    },
    preserveAspectRatio = 'xMidYMid meet',
  } = params;

  const meetOrSlice = preserveAspectRatio.split(' ')[1] || 'meet';
  const resizeMode = meetOrSlice === 'meet' ? 'contain' : 'cover';

  // Determine the rect to generate layers within
  const croppedRect = resize(viewBox, layout, resizeMode);
  const scale = croppedRect.width / viewBox.width;

  // The top-level frame is the union of every path within
  const frame = unionRects(
    ...children.map(pathElement => makeBoundingRectFromCommands(pathElement.data.params.commands)),
  );

  // Scale the frame to fill the viewBox
  const scaledFrame = scaleRect(frame, scale);

  const layers = children.map(element => makeLayerFromPathElement(element, scaledFrame, scale));
  return makeLayerGroup(croppedRect, layers, name);
}
