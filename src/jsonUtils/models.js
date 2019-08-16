/* eslint-disable no-mixed-operators, no-bitwise */
// @flow
import type {
  SJColor,
  SJFill,
  SJImageDataReference,
  SJRect,
  SJSymbolMaster,
  SJSymbolInstanceLayer,
} from 'sketchapp-json-flow-types';
import * as seedrandom from 'seedrandom';
import { FillType } from 'sketch-constants';
import * as normalizeColor from 'normalize-css-color';
import type { Color, ResizeConstraints } from '../types';
import makeResizeConstraint from './resizeConstraint';

const lut = [];
for (let i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
// Hack (http://stackoverflow.com/a/21963136)
function e7(seed?: ?string) {
  const random = seed ? seedrandom(`${seed}0`) : Math.random;
  const d0 = (random() * 0xffffffff) | 0;
  const d1 = (random() * 0xffffffff) | 0;
  const d2 = (random() * 0xffffffff) | 0;
  const d3 = (random() * 0xffffffff) | 0;
  return `${lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff]}-${lut[d1 & 0xff]}${lut[(d1 >> 8) & 0xff]}-${
    lut[((d1 >> 16) & 0x0f) | 0x40]
  }${lut[(d1 >> 24) & 0xff]}-${lut[(d2 & 0x3f) | 0x80]}${lut[(d2 >> 8) & 0xff]}-${
    lut[(d2 >> 16) & 0xff]
  }${lut[(d2 >> 24) & 0xff]}${lut[d3 & 0xff]}${lut[(d3 >> 8) & 0xff]}${lut[(d3 >> 16) & 0xff]}${
    lut[(d3 >> 24) & 0xff]
  }`;
}

// Keep track on previous numbers that are generated
let previousNumber = 1;

// Will always produce a unique Number (Int) based on of the current date
function generateIdNumber() {
  let date = Date.now();

  if (date <= previousNumber) {
    previousNumber += 1;
    date = previousNumber;
  } else {
    previousNumber = date;
  }

  return date;
}

// Keep track of previous seeds
const previousSeeds = {};

export function generateID(seed?: ?string, isHardcoded?: boolean): string {
  let _seed: ?string;

  if (seed && !isHardcoded) {
    if (!previousSeeds[seed]) {
      previousSeeds[seed] = 0;
    }
    previousSeeds[seed] += 1;

    _seed = `${seed}${previousSeeds[seed]}`;
  } else if (seed && isHardcoded) {
    _seed = seed;
  }

  return e7(_seed);
}

const safeToLower = (input: Color): Color => {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
export const makeColorFromCSS = (input: Color, alpha: number = 1): SJColor => {
  const nullableColor: ?number = normalizeColor(safeToLower(input));
  const colorInt: number = nullableColor == null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha,
  };
};

// Solid color fill
export const makeColorFill = (cssColor: Color): SJFill => ({
  _class: 'fill',
  isEnabled: true,
  color: makeColorFromCSS(cssColor),
  fillType: 0,
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType: 1,
  patternTileScale: 1,
});

export const makeImageFill = (
  image: SJImageDataReference,
  patternFillType: 0 | 1 | 2 | 3 = 1,
): SJFill => ({
  _class: 'fill',
  isEnabled: true,
  fillType: FillType.Pattern,
  image,
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType,
  patternTileScale: 1,
});

// Used in frames, etc
export const makeRect = (x: number, y: number, width: number, height: number): SJRect => ({
  _class: 'rect',
  constrainProportions: false,
  x,
  y,
  width,
  height,
});

export const makeJSONDataReference = (image: {
  data: string,
  sha1: string,
}): SJImageDataReference => ({
  _class: 'MSJSONOriginalDataReference',
  _ref: `images/${generateID()}`,
  _ref_class: 'MSImageData',
  data: {
    _data: image.data,
    // TODO(gold): can I just declare this as a var instead of using Cocoa?
  },
  sha1: {
    _data: image.sha1,
  },
});

export const makeOverride = (
  path: string,
  type: 'symbolID' | 'stringValue' | 'layerStyle' | 'textStyle' | 'flowDestination' | 'image',
  value: string | SJImageDataReference,
) => ({
  _class: 'overrideValue',
  do_objectID: generateID(),
  overrideName: `${path}_${type}`,
  value,
});

export const makeSymbolInstance = (
  frame: SJRect,
  symbolID: string,
  name: string,
  resizingConstraint?: ResizeConstraints,
): SJSymbolInstanceLayer => ({
  _class: 'symbolInstance',
  horizontalSpacing: 0,
  verticalSpacing: 0,
  nameIsFixed: true,
  isVisible: true,
  do_objectID: generateID(`symbolInstance:${name}:${symbolID}`),
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  name,
  symbolID,
  frame,
});

export const makeSymbolMaster = (
  frame: SJRect,
  symbolID: string,
  name: string,
): SJSymbolMaster => ({
  _class: 'symbolMaster',
  do_objectID: generateID(),
  nameIsFixed: true,
  isVisible: true,
  backgroundColor: makeColorFromCSS('white'),
  hasBackgroundColor: false,
  name,
  changeIdentifier: generateIdNumber(),
  symbolID,
  frame,
});
