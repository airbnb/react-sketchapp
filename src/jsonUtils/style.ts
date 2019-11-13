import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { makeColorFromCSS, makeColorFill, generateID } from './models';
import { ViewStyle, TextStyle } from '../types';
import hasAnyDefined from '../utils/hasAnyDefined';

const DEFAULT_SHADOW_COLOR = '#000';

const SHADOW_STYLES = [
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'shadowSpread',
  'textShadowColor',
  'textShadowOffset',
  'textShadowOpacity',
  'textShadowRadius',
  'textShadowSpread',
];

const makeDashPattern = (style: 'dashed' | 'dotted' | 'solid', width: number): number[] => {
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
  lineCapStyle: FileFormat.LineCapStyle = FileFormat.LineCapStyle.Butt,
  lineJoinStyle: FileFormat.LineJoinStyle = FileFormat.LineJoinStyle.Miter,
): FileFormat.BorderOptions => ({
  _class: 'borderOptions',
  isEnabled: false,
  dashPattern: makeDashPattern(style, width),
  lineCapStyle,
  lineJoinStyle,
});

export const makeShadow = (
  style: ViewStyle | TextStyle,
): FileFormat.Shadow | FileFormat.InnerShadow => {
  /* eslint-disable no-nested-ternary */
  const opacity =
    style.shadowOpacity !== undefined
      ? style.shadowOpacity
      : style['textShadowOpacity'] !== undefined
      ? style['textShadowOpacity']
      : 1;
  const color = style.shadowColor || style['textShadowColor'] || DEFAULT_SHADOW_COLOR;
  const radius =
    style.shadowRadius !== undefined
      ? style.shadowRadius
      : style['textShadowRadius'] !== undefined
      ? style['textShadowRadius']
      : 1;
  const _class = style.shadowInner !== undefined ? 'innerShadow' : ('shadow' as const);
  const spread =
    style.shadowSpread !== undefined
      ? style.shadowSpread
      : style['textShadowSpread'] !== undefined
      ? style['textShadowSpread']
      : 1;
  const { width: offsetX = 0, height: offsetY = 0 } =
    style.shadowOffset || style['textShadowOffset'] || {};

  const commonProps = {
    _class,
    isEnabled: true,
    blurRadius: radius,
    color: makeColorFromCSS(color, opacity),
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: FileFormat.BlendMode.Normal,
      opacity: 1,
    },
    offsetX,
    offsetY,
    spread,
  };

  return {
    // @ts-ignore
    _class,
    ...commonProps,
  };
};

export const makeStyle = (
  style?: ViewStyle | TextStyle,
  fills?: FileFormat.Fill[],
  shadowsProp?: ViewStyle[],
): FileFormat.Style => {
  const json: FileFormat.Style = {
    _class: 'style',
    do_objectID: generateID(),
    fills: [],
    miterLimit: 10,
    innerShadows: [],
    shadows: [],
    borderOptions: makeBorderOptions('solid', 0, 0, 0),
    startMarkerType: FileFormat.MarkerType.OpenArrow,
    endMarkerType: FileFormat.MarkerType.OpenArrow,
    windingRule: FileFormat.WindingRule.EvenOdd,
    colorControls: {
      _class: 'colorControls',
      isEnabled: false,
      brightness: 1,
      contrast: 1,
      hue: 1,
      saturation: 1,
    },
  };

  if (fills && fills.length) {
    json.fills = json.fills.concat(fills);
  }

  if (!style) {
    return json;
  }

  if (style.opacity) {
    json.contextSettings = {
      _class: 'graphicsContextSettings',
      blendMode: FileFormat.BlendMode.Normal,
      opacity: style.opacity,
    };
  }

  if (style.backgroundColor) {
    const fill = makeColorFill(style.backgroundColor);
    json.fills.unshift(fill);
  }

  if (hasAnyDefined(style, SHADOW_STYLES)) {
    const shadow = [makeShadow(style)];
    if (style.shadowInner) {
      json.innerShadows = shadow;
    } else {
      json.shadows = shadow;
    }
  }

  if (shadowsProp) {
    shadowsProp.map(shadowStyle => {
      const shadow = makeShadow(shadowStyle);
      if (shadowStyle.shadowInner) {
        json.innerShadows.push(shadow);
      } else {
        json.shadows.push(shadow);
      }
      return shadowStyle;
    });
  }

  return json;
};
