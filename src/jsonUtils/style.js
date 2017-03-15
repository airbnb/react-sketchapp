/* @flow */
import type { SJBorderOptions } from 'sketchapp-json-flow-types';

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
