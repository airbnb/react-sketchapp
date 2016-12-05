/* @flow */
import convertToColor from './convertToColor';
import { SketchLayer, ViewStyle, LayoutInfo } from '../types';

const hasAnyDefined = (obj, names) => names.some(key => obj[key] !== undefined);

const BORDER_RADIUS_PROPS = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
];

const BORDER_PROPS = [
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderStyle',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
];

const view = (style: ViewStyle, layout: LayoutInfo): SketchLayer => {
  const rect = MSRectangleShape.alloc().init();
  // NOTE: the group handles the position, so we just care about width/height here
  const borderWidth = style.borderWidth || 0;
  rect.frame = MSRect.rectWithRect(
    NSMakeRect(0, 0, layout.width - borderWidth, layout.height - borderWidth)
  );

  if (hasAnyDefined(style, BORDER_RADIUS_PROPS)) {
    const initial = style.borderRadius !== undefined ? style.borderRadius : 0;
    let topLeft = initial;
    let topRight = initial;
    let bottomRight = initial;
    let bottomLeft = initial;
    if (style.borderTopLeftRadius !== undefined) {
      topLeft = style.borderTopLeftRadius;
    }
    if (style.borderTopRightRadius !== undefined) {
      topRight = style.borderTopRightRadius;
    }
    if (style.borderBottomRightRadius !== undefined) {
      bottomRight = style.borderBottomRightRadius;
    }
    if (style.borderBottomLeftRadius !== undefined) {
      bottomLeft = style.borderBottomLeftRadius;
    }
    rect.setCornerRadiusFromComponents(`${topLeft}/${topRight}/${bottomRight}/${bottomLeft}`);
  }

  const layer = MSShapeGroup.shapeWithPath(rect);
  const fillStyle = layer.style().addStylePartOfType(0);

  fillStyle.color = convertToColor(style.backgroundColor);

  if (style.opacity !== undefined) {
    layer.style().contextSettings().opacity = style.opacity;
  }


  if (hasAnyDefined(style, BORDER_PROPS)) {
    const borderStyle = layer.style().addStylePartOfType(1);
    borderStyle.setFillType(0); // solid

    if (style.borderColor !== undefined) {
      borderStyle.setColor(convertToColor(style.borderColor));
    }
    if (style.borderWidth !== undefined) {
      borderStyle.setThickness(style.borderWidth);
    }

    // TODO: handle different widths/colors for each side
    // TODO: handle different stroke patterns, like dashed etc.
  }

  // TODO: handle style.transform

  return layer;
};

module.exports = view;
