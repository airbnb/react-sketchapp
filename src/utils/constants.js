/* eslint-disable import/prefer-default-export */
// @flow

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
  'textShadowOffset',
  'textShadowRadius',
  'textShadowColor',
  'textTransform',
  'letterSpacing',
  'lineHeight',
  'writingDirection',
];

// Only components that are allowed as children of <Text> components
export const VALID_TEXT_CHILDREN_TYPES = ['text'];

// Font displayed if San Francisco fonts are not found
export const APPLE_BROKEN_SYSTEM_FONT = '.AppleSystemUIFont';
