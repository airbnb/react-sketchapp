/* @flow */
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import processTransform from './processTransform';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

const hasAnyDefined = (obj, names) => names.some(key => obj[key] !== undefined);

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
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
];

function makeRect(x, y, width, height, color) {
  const rect = MSRectangleShape.alloc().init();
  rect.frame = MSRect.rectWithRect(NSMakeRect(x, y, width, height));

  const layer = MSShapeGroup.shapeWithPath(rect);

  if (color !== undefined) {
    const fillStyle = layer.style().addStylePartOfType(0);
    fillStyle.color = convertToColor(color);
  }

  return layer;
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

    const bl = style.borderLeftWidth || 0;
    const br = style.borderRightWidth || 0;
    const bt = style.borderTopWidth || 0;
    const bb = style.borderBottomWidth || 0;

    const btlr = style.borderTopLeftRadius || 0;
    const btrr = style.borderTopRightRadius || 0;
    const bbrr = style.borderBottomRightRadius || 0;
    const bblr = style.borderBottomLeftRadius || 0;

    if (!hasAnyDefined(style, VISIBLE_STYLES)) {
      // in some cases, views are just spacing and nothing else.
      // in that case, just do nothing.

      // TODO(lmr): do border colors need to be the same as well?
    } else if (same(bl, br, bt, bb)) {
      // all sides have same border width
      // in this case, we can do everything with just a single shape.

      const rect = MSRectangleShape.alloc().init();
      rect.frame = MSRect.rectWithRect(
        NSMakeRect(bl, bt, layout.width - bl - br, layout.height - bt - bb)
      );

      // set radius
      rect.setCornerRadiusFromComponents(`${btlr}/${btrr}/${bbrr}/${bblr}`);

      // TODO(lmr):
      // we need to figure out how to move this to the group, because if we don't, it won't
      // transform its children as well...
      if (style.transform !== undefined) {
        processTransform(rect, layout, style.transform);
      }

      const content = MSShapeGroup.shapeWithPath(rect);

      content.setName('Content');

      if (style.backgroundColor !== undefined) {
        const fillStyle = content.style().addStylePartOfType(0);
        fillStyle.color = convertToColor(style.backgroundColor);
      }

      const borderStyle = content.style().addStylePartOfType(1);

      // 0 - solid
      // 1 - gradient
      borderStyle.setFillType(0); // solid

      if (style.borderTopColor !== undefined) {
        borderStyle.setColor(convertToColor(style.borderTopColor));
      }

      borderStyle.setThickness(style.borderTopWidth || 0);

      // 0 - center
      // 1 - inside
      // 2 - outside
      borderStyle.setPosition(2);


      layers.push(content);
    } else {
      // some sides have different border widths. In this case, we don't currently
      // support the border radius property, as we end up creating each border
      // as a separate shape.
      if (style.backgroundColor !== undefined) {
        const content = makeRect(
          bl,
          bt,
          layout.width - bl - br,
          layout.height - bt - bb,
          style.backgroundColor
        );
        content.setName('Content');
        layers.push(content);
      }

      if (bt > 0) {
        const topBorder = makeRect(
          0,
          0,
          layout.width,
          bt,
          style.borderTopColor
        );
        topBorder.setName('Border (top)');
        layers.push(topBorder);
      }

      if (bl > 0) {
        const leftBorder = makeRect(
          0,
          0,
          bl,
          layout.height,
          style.borderLeftColor
        );
        leftBorder.setName('Border (left)');
        layers.push(leftBorder);
      }

      if (bb > 0) {
        const bottomBorder = makeRect(
          0,
          layout.height - bb,
          layout.width,
          bb,
          style.borderBottomColor
        );
        bottomBorder.setName('Border (bottom)');
        layers.push(bottomBorder);
      }

      if (br > 0) {
        const rightBorder = makeRect(
          layout.width - br,
          0,
          br,
          layout.height,
          style.borderRightColor
        );
        rightBorder.setName('Border (right)');
        layers.push(rightBorder);
      }
      // TODO(lmr): how do we do transform in this case?
    }

    return layers;
  }
}

module.exports = ViewRenderer;
