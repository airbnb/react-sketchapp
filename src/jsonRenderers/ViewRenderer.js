/* @flow */
import { BorderPosition, FillType } from 'sketch-constants';
import type { SJShapeGroupLayer } from 'sketchapp-json-flow-types';
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import { makeRect, makeColorFromCSS } from '../jsonUtils/models';
import { makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
// import processTransform from './processTransform';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
import { makeDottedBorder, makeDashedBorder, makeShadow } from '../jsonUtils/style';

const hasAnyDefined = (obj, names) => names.some(key => obj[key] !== undefined);

const TRANSPARENT = convertToColor('transparent');
const DEFAULT_BORDER_COLOR = '#000';
const DEFAULT_BORDER_STYLE = 'solid';

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

const SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];


function makeBorderFromRect(rect, thickness, color, style) {
  // TODO(akp): fill in this function #sketch43
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
  const rect = makeRect(x, y, thickness, length);
  return makeBorderFromRect(rect, thickness, color, style);
}

function makeHorizontalBorder(x, y, length, thickness, color, style) {
  const rect = makeRect(x, y, length, thickness);
  return makeBorderFromRect(rect, thickness, color, style);
}

function same(a, b, c, d) {
  return a === b && b === c && c === d;
}

class ViewRenderer extends SketchRenderer {
  getDefaultGroupName() {
    return 'View';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): Array<SJShapeGroupLayer> {
    const layers = [];
    // NOTE(lmr): the group handles the position, so we just care about width/height here
    const {
      borderTopWidth: bt = 0,
      borderRightWidth: br = 0,
      borderBottomWidth: bb = 0,
      borderLeftWidth: bl = 0,

      borderTopLeftRadius: btlr = 0,
      borderTopRightRadius: btrr = 0,
      borderBottomRightRadius: bbrr = 0,
      borderBottomLeftRadius: bblr = 0,

      borderTopColor: bct = DEFAULT_BORDER_COLOR,
      borderRightColor: bcr = DEFAULT_BORDER_COLOR,
      borderBottomColor: bcb = DEFAULT_BORDER_COLOR,
      borderLeftColor: bcl = DEFAULT_BORDER_COLOR,

      borderTopStyle: bst = DEFAULT_BORDER_STYLE,
      borderRightStyle: bsr = DEFAULT_BORDER_STYLE,
      borderBottomStyle: bsb = DEFAULT_BORDER_STYLE,
      borderLeftStyle: bsl = DEFAULT_BORDER_STYLE,
    } = style;

    if (!hasAnyDefined(style, VISIBLE_STYLES)) {
      return layers;
    }

    const backgroundColor = style.backgroundColor || DEFAULT_BACKGROUND_COLOR;

    const frame = makeRect(bl, bt, layout.width, layout.height);
    const radii = [btlr, btrr, bbrr, bblr];
    const shapeLayer = makeRectShapeLayer(
      0,
      0,
      layout.width,
      layout.height,
      radii,
    );
    const content = makeShapeGroup(frame, [shapeLayer], backgroundColor);

    if (hasAnyDefined(style, SHADOW_STYLES)) {
      content.style.shadows = [makeShadow(style)];
    }

    if (same(bl, br, bt, bb) && same(bcl, bcr, bct, bcb) && same(bsl, bsr, bst, bsb)) {
      // all sides have same border width
      // in this case, we can do everything with just a single shape.
      if (bst !== undefined) {
        switch (bst) {
          case 'dashed': {
            content.style.borderOptions = makeDashedBorder(bt);
            break;
          }
          case 'dotted': {
            content.style.borderOptions = makeDottedBorder(bt);
            break;
          }
          case 'solid':
            break;
          default:
            break;
        }
      }

      if (bct !== undefined) {
        content.style.borders = [
          {
            _class: 'border',
            isEnabled: true,
            color: makeColorFromCSS(bct),
            fillType: 0,
            position: BorderPosition.Inside,
            thickness: bl,
          },
        ];
      }
      layers.push(content);
    } else {
      // TODO(akp): Handle this case #sketch43
      content.hasClippingMask = true;
      layers.push(content);

      log('non uniform border, continuing');

      // if (bt > 0) {
      //   const topBorder = makeHorizontalBorder(0, 0, layout.width, bt, bct, bst);
      //   topBorder.name = 'Border (top)';
      //   layers.push(topBorder);
      // }
      //
      // if (bl > 0) {
      //   const leftBorder = makeVerticalBorder(0, 0, layout.height, bl, bcl, bsl);
      //   leftBorder.name = 'Border (left)';
      //   layers.push(leftBorder);
      // }
      //
      // if (bb > 0) {
      //   const bottomBorder = makeHorizontalBorder(
      //     0,
      //     layout.height - bb,
      //     layout.width,
      //     bb,
      //     bcb,
      //     bsb,
      //   );
      //   bottomBorder.name = 'Border (bottom)';
      //   layers.push(bottomBorder);
      // }
      //
      // if (br > 0) {
      //   const rightBorder = makeVerticalBorder(layout.width - br, 0, layout.height, br, bcr, bsr);
      //   rightBorder.name = 'Border (right)';
      //   layers.push(rightBorder);
      // }
      // TODO(lmr): how do we do transform in this case?
    }
    return layers;
  }
}

module.exports = ViewRenderer;
