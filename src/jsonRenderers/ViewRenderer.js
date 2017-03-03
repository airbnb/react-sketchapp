/* @flow */
import { BorderPosition, FillType } from 'sketch-constants';
import convertToColor from '../utils/convertToColor';
import colorWithOpacity from '../utils/colorWithOpacity';
import SketchRenderer from './SketchRenderer';
import { makeRect, makeColorFromCSS } from '../jsonUtils/models';
import { makeRectPath, makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import processTransform from './processTransform';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

const hasAnyDefined = (obj, names) => names.some(key => obj[key] !== undefined);

const TRANSPARENT = convertToColor('transparent');
const DEFAULT_BORDER_COLOR = '#000';
const DEFAULT_BORDER_STYLE = 'solid';
const DEFAULT_SHADOW_COLOR = '#000'; // TODO: what does web do?
const DEFAULT_BACKGROUND_COLOR = TRANSPARENT;

const VISIBLE_STYLES = [
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderStyle',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
];

const SHADOW_STYLES = [
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
];

function makeShadow(color, opacity, radius, offsetX, offsetY) {
  return {
    _class: 'shadow',
    isEnabled: true,
    blurRadius: radius,
    color: makeColorFromCSS(color),
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: 0,
      opacity: opacity,
    },
    offsetX: offsetX,
    offsetY: offsetY,
    spread: 0,
  };
}

// TODO(akp): This shouldn't really mutate layer but ok for now
function addShadowToLayer(layer, style) {

  const opacity = style.shadowOpacity !== undefined ? style.shadowOpacity : 1;
  const color = style.shadowColor || DEFAULT_SHADOW_COLOR;
  const radius = style.shadowRadius !== undefined ? style.shadowRadius : 1;
  const {width: offsetX = 0, height: offsetY = 0} = style.shadowOffset;

  layer.shadows = [makeShadow(color, opacity, radius * 2, offsetX, offsetY)];
}

function makeBorderFromRect(rect, thickness, color, style) {
  // TODO(akp): fill in this function
  return null;
  /*

  const layer = MSShapeGroup.shapeWithPath(rect);

  layer.style().addStylePartOfType(0).color = TRANSPARENT;

  const borderStyle = layer.style().addStylePartOfType(1);

  const borderOptions = layer.style().borderOptions();

  borderStyle.setFillType(FillType.Solid);
  borderStyle.setThickness(thickness || 0);
  borderStyle.setPosition(BorderPosition.Inside);

  borderStyle.setColor(convertToColor(color || DEFAULT_BORDER_COLOR));

  switch (style) {
    case 'dashed':
      borderOptions.setDashPattern([thickness * 3, thickness * 4]);
      break;
    case 'dotted':
      borderOptions.setDashPattern([thickness / 2, thickness / 2]);
      borderOptions.setLineJoinStyle(0);
      break;
    case 'solid':
    default:
      // do nothing
      break;
  }
  return layer;

  */
}

function makeVerticalBorder(x, y, length, thickness, color, style) {
  // TODO(lmr): refactor this to use a linear path instead of rectangle
  const rect = makeRect(x, y, thickness, length);
  return makeBorderFromRect(rect, thickness, color, style);
}

function makeHorizontalBorder(x, y, length, thickness, color, style) {
  // TODO(lmr): refactor this to use a linear path instead of rectangle
  const rect = makeRect(x, y, length, thickness);
  return makeBorderFromRect(rect, thickness, color, style);
}


function same(a, b, c, d) {
  return a === b && b === c && c === d;
}

class ViewRenderer extends SketchRenderer {
  getDefaultGroupName(/* props: any, value: ?string */) {
    return 'View';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): Array<SketchLayer> {
    const layers = [];

    // NOTE: the group handles the position, so we just care about width/height here
    // TODO: switch to ES6 comprehensions here

    const bl = style.borderLeftWidth || 0;
    const br = style.borderRightWidth || 0;
    const bt = style.borderTopWidth || 0;
    const bb = style.borderBottomWidth || 0;

    const btlr = style.borderTopLeftRadius || 0;
    const btrr = style.borderTopRightRadius || 0;
    const bbrr = style.borderBottomRightRadius || 0;
    const bblr = style.borderBottomLeftRadius || 0;

    const bcl = style.borderLeftColor || DEFAULT_BORDER_COLOR;
    const bcr = style.borderRightColor || DEFAULT_BORDER_COLOR;
    const bct = style.borderTopColor || DEFAULT_BORDER_COLOR;
    const bcb = style.borderBottomColor || DEFAULT_BORDER_COLOR;

    const bsl = style.borderLeftStyle || DEFAULT_BORDER_STYLE;
    const bsr = style.borderRightStyle || DEFAULT_BORDER_STYLE;
    const bst = style.borderTopStyle || DEFAULT_BORDER_STYLE;
    const bsb = style.borderBottomStyle || DEFAULT_BORDER_STYLE;

    if (!hasAnyDefined(style, VISIBLE_STYLES)) {
      // in some cases, views are just spacing and nothing else.
      // in that case, just do nothing.

    } else if (same(bl, br, bt, bb) && same(bcl, bcr, bct, bcb) && same(bsl, bsr, bst, bsb)) {
      // all sides have same border width
      // in this case, we can do everything with just a single shape.

      const borderColor = bcl;
      const backgroundColor = style.backgroundColor || DEFAULT_BACKGROUND_COLOR;
 

      const frame = makeRect(bl, bt, layout.width - bl - br, layout.height - bt - bb);
      const radii = [bsl, bsr, bst, bsb];
      const shapeLayer = makeRectShapeLayer(0, 0, layout.width - bl - br, layout.height - bt - bb, radii);
      const content = makeShapeGroup(frame, [shapeLayer], backgroundColor);










      // const r = MSRectangleShape.alloc().init();
      // r.frame = MSRect.rectWithRect(
      //   NSMakeRect(bl, bt, layout.width - bl - br, layout.height - bt - bb)
      // );

      // set radius
      // r.setCornerRadiusFromComponents(`${btlr}/${btrr}/${bbrr}/${bblr}`);

      // TODO(akp): implement this 
      // TODO(lmr):
      // we need to figure out how to move this to the group, because if we don't, it won't
      // transform its children as well...
      // if (style.transform !== undefined) {
      //   processTransform(rect, layout, style.transform);
      // }

      // const content = MSShapeGroup.shapeWithPath(rect);

      // content.name = 'Content';

      if (hasAnyDefined(style, SHADOW_STYLES)) {
        addShadowToLayer(content, style);
      }

      // TODO(akp): implement borders
      // const borderStyle = content.style().addStylePartOfType(1);

      // borderStyle.setFillType(FillType.Solid); // solid

      // if (style.borderTopStyle !== undefined) {
      //   const borderOptions = content.style().borderOptions();
      //   const width = style.borderTopWidth;

      //   // borderOptions.setLineCapStyle(BorderLineCapsStyle.Square);

      //   switch (style.borderTopStyle) {
      //     case 'dashed':
      //       borderOptions.setDashPattern([width * 3, width * 3]);
      //       break;
      //     case 'dotted':
      //       borderOptions.setDashPattern([width, width]);
      //       borderOptions.setLineJoinStyle(0);
      //       break;
      //     case 'solid':
      //     default:
      //       // do nothing
      //       break;
      //   }
      // }

      // if (style.borderTopColor !== undefined) {
      //   borderStyle.setColor(convertToColor(style.borderTopColor));
      // }

      // borderStyle.setThickness(style.borderTopWidth || 0);

      // borderStyle.setPosition(BorderPosition.Outside);


      layers.push(content);

    } else {
      //TODO(akp): Handle this case
      log("non uniform border, continuing");
      return [];

      // some sides have different border widths. In this case, we don't currently
      // support the border radius property, as we end up creating each border
      // as a separate shape.
      const content = makeRectShapeGroup(
        bl,
        bt,
        layout.width - bl - br,
        layout.height - bt - bb,
        style.backgroundColor || DEFAULT_BACKGROUND_COLOR
      );
      if (hasAnyDefined(style, SHADOW_STYLES)) {
        addShadowToLayer(content, style);
      }
      // TODO(akp): treat this as immutible?
      content.name = 'Content';
      layers.push(content);

      if (bt > 0) {
        const topBorder = makeHorizontalBorder(
          0,
          0,
          layout.width,
          bt,
          bct,
          bst
        );
        topBorder.name = 'Border (top)';
        layers.push(topBorder);
      }

      if (bl > 0) {
        const leftBorder = makeVerticalBorder(
          0,
          0,
          layout.height,
          bl,
          bcl,
          bsl
        );
        leftBorder.name = 'Border (left)';
        layers.push(leftBorder);
      }

      if (bb > 0) {
        const bottomBorder = makeHorizontalBorder(
          0,
          layout.height - bb,
          layout.width,
          bb,
          bcb,
          bsb
        );
        bottomBorder.name = 'Border (bottom)';
        layers.push(bottomBorder);
      }

      if (br > 0) {
        const rightBorder = makeVerticalBorder(
          layout.width - br,
          0,
          layout.height,
          br,
          bcr,
          bsr
        );
        rightBorder.name = 'Border (right)';
        layers.push(rightBorder);
      }
      // TODO(lmr): how do we do transform in this case?
    }

    return layers;
  }
}

module.exports = ViewRenderer;
