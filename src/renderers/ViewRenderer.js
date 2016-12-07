/* @flow */
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

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

/*
  a   b   0
  c   d   0
  tx  ty  1
 */
function CGAffineTransformMake(a, b, c, d, tx, ty) {
  return { a, b, c, d, tx, ty };
}

function convertToRadians(value: string): number {
  const floatValue = parseFloat(value, 10);
  return value.indexOf('rad') > -1 ? floatValue : ((floatValue * Math.PI) / 180);
}

function applyTransform(rect: any, layout: LayoutInfo, key: string, value: number | string) {
  let transform = null;
  switch (key) {
    case 'perspective':
      // TODO: Figure out how to do 3D transforms
      break;
    case 'rotate':
    case 'rotateZ':
      transform = CGAffineTransformMakeRotation(convertToRadians(value));
      break;
    case 'rotateX':
    case 'rotateY':
      // TODO: Figure out how to do 3D transforms
      break;
    case 'scale':
      transform = CGAffineTransformMakeScale(value, value);
      break;
    case 'scaleX':
      transform = CGAffineTransformMakeScale(value, 1);
      break;
    case 'scaleY':
      transform = CGAffineTransformMakeScale(1, value);
      break;
    case 'translateX':
      transform = CGAffineTransformMakeTranslation(value / layout.width, 0);
      break;
    case 'translateY':
      transform = CGAffineTransformMakeTranslation(0, value / layout.height);
      break;
    case 'skewX': {
      //   1      0      0
      // sin(x) cos(x)   0
      //   0      0      1
      const rads = convertToRadians(value);
      transform = CGAffineTransformMake(1, 0, Math.sin(rads), Math.cos(rads), 0, 0);
    } break;
    case 'skewY': {
      // cos(y) sin(y)   0
      //   0      1      0
      //   0      0      1
      const rads = convertToRadians(value);
      transform = CGAffineTransformMake(Math.cos(rads), Math.sin(rads), 0, 1, 0, 0);
    } break;
    default:
      log(`did an unsupported transform: ${key}: ${value}`);
      break;
  }
  if (transform !== null) {
    // by default in sketch, transform origin is (0, 0), but in RN it's (0.5, 0.5)
    // to remedy, we apply a translation matrix before and after the transform
    const translate = CGAffineTransformMakeTranslation(-0.5, -0.5);
    const untranslate = CGAffineTransformMakeTranslation(0.5, 0.5);
    // this is effectively translate * transfrom * untranslate
    transform = CGAffineTransformConcat(translate, transform);
    transform = CGAffineTransformConcat(transform, untranslate);
    rect.applyAffineTransformToPath(transform);
  }
}

function processTransform(rect: any, layout: LayoutInfo, transforms: Array<any>) {
  transforms.forEach((t) => {
    Object.keys(t).forEach(key => applyTransform(rect, layout, key, t[key]));
  });
}

class ViewRenderer extends SketchRenderer {
  renderBackingLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): SketchLayer {
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

    if (style.transform !== undefined) {
      processTransform(rect, layout, style.transform);
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
  }
}

module.exports = ViewRenderer;
