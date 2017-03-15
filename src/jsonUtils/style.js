/* @flow */
import type { SJBorderOptions, SJShadow } from 'sketchapp-json-flow-types';
import type { ViewStyle } from '../types';
import { makeColorFromCSS } from './models';

const DEFAULT_SHADOW_COLOR = '#000';

export const makeBorderStyle = (dashPattern: Array<number>): SJBorderOptions => ({
  _class: 'borderOptions',
  isEnabled: false,
  dashPattern: [...dashPattern],
  lineCapStyle: 0,
  lineJoinStyle: 0,
});

export const makeDottedBorder = (width: number): SJBorderOptions =>
  makeBorderStyle([width, width]);

export const makeDashedBorder = (width: number): SJBorderOptions =>
  makeBorderStyle([width * 3, width * 3]);

export const makeShadow = (style: ViewStyle): SJShadow => {
  const opacity = style.shadowOpacity !== undefined ? style.shadowOpacity : 1;
  const color = style.shadowColor || style.color || DEFAULT_SHADOW_COLOR;
  const radius = style.shadowRadius !== undefined ? style.shadowRadius : 1;
  const { width: offsetX = 0, height: offsetY = 0 } = style.shadowOffset || {};

  return {
    _class: 'shadow',
    isEnabled: true,
    blurRadius: radius,
    color: makeColorFromCSS(color),
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: 0,
      opacity,
    },
    offsetX,
    offsetY,
    spread: 0,
  };
};
