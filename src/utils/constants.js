// @flow
import { TextAlignment } from 'sketch-constants';

// out of date in sketch-constants
// https://github.com/turbobabr/sketch-constants/pull/1
export const PatternFillType = {
  Tile: 0,
  Fill: 1,
  Stretch: 2,
  Fit: 3,
};

export const INHERITABLE_FONT_STYLES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'textAlign',
  'textDecoration',
  'textShadowColor',
  'textShadowOffset',
  'textShadowOpacity',
  'textShadowRadius',
  'textShadowSpread',
  'textTransform',
  'letterSpacing',
  'lineHeight',
  'writingDirection',
  'paragraphSpacing',
];

// Only components that are allowed as children of <Text> components
export const VALID_TEXT_CHILDREN_TYPES = ['text'];

// Font displayed if San Francisco fonts are not found
export const APPLE_BROKEN_SYSTEM_FONT = '.AppleSystemUIFont';

export const TEXT_ALIGN = {
  auto: TextAlignment.Left,
  left: TextAlignment.Left,
  right: TextAlignment.Right,
  center: TextAlignment.Center,
  justify: TextAlignment.Justified,
};

export const TEXT_DECORATION_UNDERLINE = {
  none: 0,
  underline: 1,
  double: 9,
};

export const TEXT_DECORATION_LINETHROUGH = {
  none: 0,
  'line-through': 1,
};

// this doesn't exist in constants
export const TEXT_TRANSFORM = {
  uppercase: 1,
  lowercase: 2,
  initial: 0,
  inherit: 0,
  none: 0,
  capitalize: 0,
};
