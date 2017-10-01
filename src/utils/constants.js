/* eslint-disable import/prefer-default-export */

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

export const SKETCH_TREE_OBJECT_STUB = {
  type: null,
  style: {},
  layout: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
  },
  textStyle: {},
  props: {},
  value: null,
  children: [],
};

// Components that are not allowed within <Text> components
export const INVALID_TEXT_CHILDREN_TYPES = [
  'image',
  'artboard',
  'view',
  'document',
  'page',
];
