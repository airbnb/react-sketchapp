/* @flow */
import { BorderPosition } from 'sketch-constants';
import type { SJShapeGroupLayer } from 'sketchapp-json-flow-types';
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import { makeRect, makeColorFill, makeColorFromCSS } from '../jsonUtils/models';
import { makeHorizontalPath, makeVerticalPath, makeShapePath, makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
// import processTransform from './processTransform';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';
import { makeDottedBorder, makeDashedBorder, makeShadow } from '../jsonUtils/style';
import hasAnyDefined from '../utils/hasAnyDefined';
import same from '../utils/same';

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

const makeVerticalBorder = (
  x: number,
  y: number,
  length: number,
  thickness: number,
  color,
): SJShapeGroupLayer => {
  const frame = makeRect(x, y, thickness, length);
  const shapeFrame = makeRect(0, 0, thickness, length);
  const shapePath = makeShapePath(shapeFrame, makeVerticalPath());
  const content = makeShapeGroup(frame, [shapePath]);
  content.style.borders = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: 0,
      position: BorderPosition.Center,
      thickness,
    },
  ];
  return content;
};

const makeHorizontalBorder = (
  x: number,
  y: number,
  length: number,
  thickness: number,
  color,
): SJShapeGroupLayer => {
  const frame = makeRect(x, y, length, thickness);
  const shapeFrame = makeRect(0, 0, length, thickness);
  const shapePath = makeShapePath(shapeFrame, makeHorizontalPath());
  const content = makeShapeGroup(frame, [shapePath]);
  content.style.borders = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: 0,
      position: BorderPosition.Center,
      thickness,
    },
  ];
  return content;
};

const findBorderStyle = (style: 'dashed' | 'dotted' | 'solid', width: number) => {
  // if (style !== undefined) {
  switch (style) {
    case 'dashed': {
      return makeDashedBorder(width);
    }
    case 'dotted': {
      return makeDottedBorder(width);
    }
    case 'solid':
      return null;
    default:
      return null;
  }
};

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

    const frame = makeRect(0, 0, layout.width, layout.height);
    const radii = [btlr, btrr, bbrr, bblr];
    const shapeLayer = makeRectShapeLayer(
      0,
      0,
      layout.width,
      layout.height,
      radii,
    );

    const fill = makeColorFill(backgroundColor);
    const content = makeShapeGroup(frame, [shapeLayer], [fill]);

    if (hasAnyDefined(style, SHADOW_STYLES)) {
      content.style.shadows = [makeShadow(style)];
    }

    if (same(bl, br, bt, bb) && same(bcl, bcr, bct, bcb) && same(bsl, bsr, bst, bsb)) {
      // all sides have same border width
      // in this case, we can do everything with just a single shape.
      if (bst !== undefined) {
        const borderOptions = findBorderStyle(bst, bt);
        if (borderOptions) {
          content.style.borderOptions = borderOptions;
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
      content.hasClippingMask = true;
      layers.push(content);

      if (bt > 0) {
        const topBorder = makeHorizontalBorder(
          0,
          0,
          layout.width,
          bt,
          bct,
        );
        topBorder.name = 'Border (top)';

        const borderOptions = findBorderStyle(bst, bt);
        if (borderOptions) {
          topBorder.style.borderOptions = borderOptions;
        }

        layers.push(topBorder);
      }

      if (br > 0) {
        const rightBorder = makeVerticalBorder(
          layout.width - br,
          0,
          layout.height,
          br,
          bcr,
        );
        rightBorder.name = 'Border (right)';

        const borderOptions = findBorderStyle(bsr, br);
        if (borderOptions) {
          rightBorder.style.borderOptions = borderOptions;
        }

        layers.push(rightBorder);
      }

      if (bb > 0) {
        const bottomBorder = makeHorizontalBorder(
          0,
          layout.height - bb,
          layout.width,
          bb,
          bcb,
          bsb,
        );
        bottomBorder.name = 'Border (bottom)';

        const borderOptions = findBorderStyle(bsb, bb);
        if (borderOptions) {
          bottomBorder.style.borderOptions = borderOptions;
        }

        layers.push(bottomBorder);
      }

      if (bl > 0) {
        const leftBorder = makeVerticalBorder(0, 0, layout.height, bl, bcl, bsl);
        leftBorder.name = 'Border (left)';

        const borderOptions = findBorderStyle(bsl, bl);
        if (borderOptions) {
          leftBorder.style.borderOptions = borderOptions;
        }

        layers.push(leftBorder);
      }

      // TODO(lmr): how do we do transform in this case?
    }
    return layers;
  }
}

module.exports = ViewRenderer;
