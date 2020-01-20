import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeColorFromCSS, makeColorFill } from './models';
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
  const opacity =
    style.shadowOpacity !== undefined
      ? style.shadowOpacity
      : 'textShadowOpacity' in style && style.textShadowOpacity !== undefined
      ? style.textShadowOpacity
      : 1;
  const color =
    style.shadowColor ||
    ('textShadowColor' in style && style.textShadowColor) ||
    DEFAULT_SHADOW_COLOR;
  const radius =
    style.shadowRadius !== undefined
      ? style.shadowRadius
      : 'textShadowRadius' in style && style.textShadowRadius !== undefined
      ? style.textShadowRadius
      : 1;
  const spread =
    style.shadowSpread !== undefined
      ? style.shadowSpread
      : 'textShadowSpread' in style && style.textShadowSpread !== undefined
      ? style.textShadowSpread
      : 1;
  const { width: offsetX = 0, height: offsetY = 0 } =
    style.shadowOffset || ('textShadowOffset' in style && style.textShadowOffset) || {};

  const commonProps = {
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
  } as const;

  if (style.shadowInner) {
    return {
      _class: 'innerShadow',
      ...commonProps,
    };
  }

  return {
    _class: 'shadow',
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
      json.innerShadows = shadow as FileFormat.InnerShadow[];
    } else {
      json.shadows = shadow as FileFormat.Shadow[];
    }
  }

  if (shadowsProp) {
    shadowsProp.map(shadowStyle => {
      const shadow = makeShadow(shadowStyle);
      if (shadowStyle.shadowInner) {
        json.innerShadows.push(shadow as FileFormat.InnerShadow);
      } else {
        json.shadows.push(shadow as FileFormat.Shadow);
      }
      return shadowStyle;
    });
  }

  return json;
};

export function parseStyle(json: FileFormat.Style): ViewStyle {
  const style: ViewStyle = {};

  if (json.contextSettings && json.contextSettings.opacity !== 1) {
    style.opacity = json.contextSettings.opacity;
  }

  if (
    json.fills.length > 0 &&
    json.fills[0].fillType === FileFormat.FillType.Color &&
    json.fills[0].isEnabled
  ) {
    const color = json.fills[0].color;
    style.backgroundColor = `#${Math.round(color.red * 255).toString(16)}${Math.round(
      color.green * 255,
    ).toString(16)}${Math.round(color.blue * 255).toString(16)}`;

    if (color.alpha !== 1) {
      style.backgroundColor += `${Math.round(color.alpha * 255).toString(16)}`;
    }
  }

  if (
    (json.shadows.length > 0 && json.shadows[0].isEnabled) ||
    (json.innerShadows.length > 0 && json.innerShadows[0].isEnabled)
  ) {
    const isNormalShadow = json.shadows.length > 0 && json.shadows[0].isEnabled;
    const shadow = isNormalShadow ? json.shadows[0] : json.innerShadows[0];
    style.shadowRadius = shadow.blurRadius;
    style.shadowSpread = shadow.spread;
    style.shadowOffset = {
      width: shadow.offsetX,
      height: shadow.offsetY,
    };

    const color = shadow.color;
    style.shadowColor = `#${Math.round(color.red * 255).toString(16)}${Math.round(
      color.green * 255,
    ).toString(16)}${Math.round(color.blue * 255).toString(16)}`;

    if (color.alpha !== 1) {
      style.shadowOpacity = color.alpha;
    }

    if (!isNormalShadow) {
      style.shadowInner = true;
    }
  }

  return style;
}
