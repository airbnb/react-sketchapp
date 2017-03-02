import normalizeColor from 'normalize-css-color';
import type { Color } from '../types';

/*
These are all JSON types used in the sketch format
*/ 

// TODO: don't depend on sketch here if we're not running there!
export const generateID = () => MSModelObjectCommon.generateObjectID();

// Solid color fill
export const makeColorFill = (color) => ({
  _class: 'fill',
  isEnabled: true,
  color: color,
  fillType: 0,
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType: 1,
  patternTileScale: 1
});

// Used in frames, etc
export const makeRect = (x, y, width, height): Any => ({
  _class: 'rect', 
  constrainProportions: false,
  x, y, width, height,
});


// Takes 'white', '#fff', &c
export const makeColorFromCSS = (input: Color): Any => {
  const nullableColor: ?number = normalizeColor(input);
  const colorInt: number = nullableColor == null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return {
    _class: 'color',
    red:   r / 255,
    green: g / 255,
    blue:  b / 255,
    alpha: a,
  };
};

