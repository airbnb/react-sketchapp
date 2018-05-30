// @flow
import { BorderPosition } from 'sketch-constants';
import type { SJBorderOptions, SJShadow, SJShapeGroupLayer } from 'sketchapp-json-flow-types';
import { makeRect, makeColorFromCSS } from '../jsonUtils/models';
import {
  makeHorizontalPath,
  makeVerticalPath,
  makeShapePath,
  makeShapeGroup,
} from '../jsonUtils/shapeLayers';
import type { Color, ViewStyle } from '../types';

const DEFAULT_SHADOW_COLOR = '#000';

const makeDashPattern = (style: 'dashed' | 'dotted' | 'solid', width: number): Array<number> => {
  switch (style) {
    case 'dashed':
      return [width * 3, width * 3];
    case 'dotted':
      return [width, width];
    case 'solid':
      return [];
    default:
      return [];
  }
};

export const makeBorderOptions = (
  style: 'dashed' | 'dotted' | 'solid',
  width: number,
): SJBorderOptions => ({
  _class: 'borderOptions',
  isEnabled: false,
  dashPattern: makeDashPattern(style, width),
  lineCapStyle: 0,
  lineJoinStyle: 0,
});

export const makeShadow = (style: ViewStyle): SJShadow => {
  const opacity = style.shadowOpacity !== undefined ? style.shadowOpacity : 1;
  const color = style.shadowColor || style.color || DEFAULT_SHADOW_COLOR;
  const radius = style.shadowRadius !== undefined ? style.shadowRadius : 1;
  const _class = style.shadowInner !== undefined ? 'innerShadow' : 'shadow';
  const spread = style.shadowSpread !== undefined ? style.shadowSpread : 0;
  const { width: offsetX = 0, height: offsetY = 0 } = style.shadowOffset || {};

  return {
    _class,
    isEnabled: true,
    blurRadius: radius,
    color: makeColorFromCSS(color, opacity),
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: 0,
      opacity: 1,
    },
    offsetX,
    offsetY,
    spread,
  };
};

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
