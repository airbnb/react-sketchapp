// @flow
import type { SJBorderOptions, SJShadow, SJFill, SJStyle } from 'sketchapp-json-flow-types';
import { makeColorFromCSS, makeColorFill } from './models';
import type { ViewStyle, TextStyle } from '../types';
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

export const makeShadow = (style: ViewStyle | TextStyle): SJShadow => {
  /* eslint-disable no-nested-ternary */
  const opacity =
    style.shadowOpacity !== undefined
      ? style.shadowOpacity
      : style.textShadowOpacity !== undefined
        ? style.textShadowOpacity
        : 1;
  const color = style.shadowColor || style.textShadowColor || DEFAULT_SHADOW_COLOR;
  const radius =
    style.shadowRadius !== undefined
      ? style.shadowRadius
      : style.textShadowRadius !== undefined
        ? style.textShadowRadius
        : 1;
  const _class = style.shadowInner !== undefined ? 'innerShadow' : 'shadow';
  const spread =
    style.shadowSpread !== undefined
      ? style.shadowSpread
      : style.textShadowSpread !== undefined
        ? style.textShadowSpread
        : 1;
  const { width: offsetX = 0, height: offsetY = 0 } =
    style.shadowOffset || style.textShadowOffset || {};

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

export const makeStyle = (
  style?: ViewStyle | TextStyle,
  fills?: Array<SJFill>,
  shadowsProp?: Array<ViewStyle>,
): SJStyle => {
  const json = {
    _class: 'style',
    endDecorationType: 0,
    fills: [],
    miterLimit: 10,
    startDecorationType: 0,
    innerShadows: [],
    shadows: [],
  };

  if (fills && fills.length) {
    json.fills = json.fills.concat(fills);
  }

  if (!style) {
    return json;
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
