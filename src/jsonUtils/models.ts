import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import seedrandom from 'seedrandom';
import normalizeColor, { rgba } from 'normalize-css-color';
import { Color, ResizeConstraints } from '../types';
import { makeResizeConstraint } from './resizeConstraint';

const lut: string[] = [];
for (let i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
// Hack (http://stackoverflow.com/a/21963136)
function e7(seed?: string) {
  const random = seed ? seedrandom(`${seed}0`) : Math.random;
  const d0 = (random() * 0xffffffff) | 0;
  const d1 = (random() * 0xffffffff) | 0;
  const d2 = (random() * 0xffffffff) | 0;
  const d3 = (random() * 0xffffffff) | 0;
  return `${
    lut[d0 & 0xff] + lut[(d0 >> 8) & 0xff] + lut[(d0 >> 16) & 0xff] + lut[(d0 >> 24) & 0xff]
  }-${lut[d1 & 0xff]}${lut[(d1 >> 8) & 0xff]}-${lut[((d1 >> 16) & 0x0f) | 0x40]}${
    lut[(d1 >> 24) & 0xff]
  }-${lut[(d2 & 0x3f) | 0x80]}${lut[(d2 >> 8) & 0xff]}-${lut[(d2 >> 16) & 0xff]}${
    lut[(d2 >> 24) & 0xff]
  }${lut[d3 & 0xff]}${lut[(d3 >> 8) & 0xff]}${lut[(d3 >> 16) & 0xff]}${lut[(d3 >> 24) & 0xff]}`;
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
const previousSeeds: { [seed: string]: number } = {};

export function generateID(seed?: string, hardcoded?: boolean): string {
  let _seed = seed;

  if (seed) {
    if (!previousSeeds[seed]) {
      previousSeeds[seed] = 0;
    }
    previousSeeds[seed] += 1;

    if (!hardcoded) {
      _seed = `${seed}${previousSeeds[seed]}`;
    }
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
export const makeColorFromCSS = (input: Color, alpha: number = 1): FileFormat.Color => {
  const nullableColor = normalizeColor(safeToLower(input));
  const colorInt: number = nullableColor == null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = rgba(colorInt);

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha,
  };
};

export const emptyGradient: FileFormat.Gradient = {
  _class: 'gradient',
  elipseLength: 0,
  from: '{0.5, 0}',
  gradientType: 0,
  to: '{0.5, 1}',
  stops: [
    {
      _class: 'gradientStop',
      position: 0,
      color: {
        _class: 'color',
        alpha: 1,
        blue: 1,
        green: 1,
        red: 1,
      },
    },
    {
      _class: 'gradientStop',
      position: 1,
      color: {
        _class: 'color',
        alpha: 1,
        blue: 0,
        green: 0,
        red: 0,
      },
    },
  ],
};

// Solid color fill
export const makeColorFill = (cssColor: Color): FileFormat.Fill => ({
  _class: 'fill',
  isEnabled: true,
  color: makeColorFromCSS(cssColor),
  fillType: FileFormat.FillType.Color,
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType: FileFormat.PatternFillType.Fill,
  patternTileScale: 1,
  contextSettings: {
    _class: 'graphicsContextSettings',
    blendMode: FileFormat.BlendMode.Normal,
    opacity: 1,
  },
  gradient: emptyGradient,
});

export const makeImageFill = (
  image: FileFormat.ImageDataRef,
  patternFillType: FileFormat.PatternFillType = FileFormat.PatternFillType.Fill,
): FileFormat.Fill => ({
  _class: 'fill',
  isEnabled: true,
  fillType: FileFormat.FillType.Pattern,
  color: makeColorFromCSS('white'),
  image,
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType,
  patternTileScale: 1,
  contextSettings: {
    _class: 'graphicsContextSettings',
    blendMode: FileFormat.BlendMode.Normal,
    opacity: 1,
  },
  gradient: emptyGradient,
});

// Used in frames, etc
export const makeRect = (x: number, y: number, width: number, height: number): FileFormat.Rect => ({
  _class: 'rect',
  constrainProportions: false,
  x,
  y,
  width,
  height,
});

export const makeJSONDataReference = (image: {
  data: string;
  sha1: string;
}): FileFormat.ImageDataRef => ({
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
  value: string | FileFormat.ImageDataRef,
): FileFormat.OverrideValue => ({
  _class: 'overrideValue',
  do_objectID: generateID(),
  overrideName: `${path}_${type}`,
  // @ts-ignore https://github.com/sketch-hq/sketch-file-format-ts/issues/9
  value,
});

export const makeSymbolInstance = (
  frame: FileFormat.Rect,
  symbolID: string,
  name: string,
  resizingConstraint?: ResizeConstraints | null,
): FileFormat.SymbolInstance => ({
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
  booleanOperation: FileFormat.BooleanOperation.NA,
  isLocked: false,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
  resizingType: FileFormat.ResizeType.Stretch,
  rotation: 0,
  shouldBreakMaskChain: false,
  overrideValues: [],
  scale: 1,
  exportOptions: {
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
  },
});

export const makeSymbolMaster = (
  frame: FileFormat.Rect,
  symbolID: string,
  name: string,
): FileFormat.SymbolMaster => ({
  _class: 'symbolMaster',
  do_objectID: generateID(`symbolMaster:${name}`, !!name),
  nameIsFixed: true,
  isVisible: true,
  backgroundColor: makeColorFromCSS('white'),
  hasBackgroundColor: false,
  name,
  changeIdentifier: generateIdNumber(),
  symbolID,
  frame,
  booleanOperation: FileFormat.BooleanOperation.NA,
  isLocked: false,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
  resizingType: FileFormat.ResizeType.Stretch,
  rotation: 0,
  shouldBreakMaskChain: false,
  exportOptions: {
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
  },
  resizingConstraint: makeResizeConstraint(),
  hasClickThrough: false,
  layers: [],
  horizontalRulerData: {
    _class: 'rulerData',
    base: 0,
    guides: [],
  },
  verticalRulerData: {
    _class: 'rulerData',
    base: 0,
    guides: [],
  },
  includeInCloudUpload: true,
  includeBackgroundColorInExport: false,
  includeBackgroundColorInInstance: false,
  isFlowHome: false,
  resizesContent: false,
  allowsOverrides: true,
  overrideProperties: [],
});
