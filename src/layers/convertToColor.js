/* @flow */
/* eslint no-bitwise:0 */
import normalizeColor from './normalizeColor';
import type { Color } from '../types';

const convertToColor = (input: Color): MSColor => {
  const nullableColor: ?number = normalizeColor(input);
  const colorInt: number = nullableColor == null ? 0x00000000 : nullableColor;

  const r = ((colorInt & 0xff000000) >>> 24) / 255;
  const g = ((colorInt & 0x00ff0000) >>> 16) / 255;
  const b = ((colorInt & 0x0000ff00) >>> 8) / 255;
  const a = ((colorInt & 0x000000ff) >>> 0) / 255;

  return MSColor.colorWithRGBADictionary({ r, g, b, a });
};

module.exports = convertToColor;
