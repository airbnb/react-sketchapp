/* @flow */
import { BorderPosition, FillType } from 'sketch-constants';
import type { SJShapeGroupLayer } from '@skpm/sketchapp-json-flow-types';
import SketchRenderer from './SketchRenderer';
import { makeRect, makeColorFill, makeColorFromCSS } from '../jsonUtils/models';
import { makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';
import {
  makeBorderOptions,
  makeShadow,
  makeHorizontalBorder,
  makeVerticalBorder,
} from '../jsonUtils/style';
import hasAnyDefined from '../utils/hasAnyDefined';
import same from '../utils/same';

const DEFAULT_BORDER_COLOR = 'transparent';
const DEFAULT_BORDER_STYLE = 'solid';

const DEFAULT_BACKGROUND_COLOR = 'transparent';

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

const OVERFLOW_STYLES = ['overflow', 'overflowX', 'overflowY'];

const SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];

class ViewRenderer extends SketchRenderer {
  getDefaultGroupName() {
    return 'View';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    // eslint-disable-next-line no-unused-vars
    props: any,
  ): Array<SJShapeGroupLayer> {
    const layers = [];
    // NOTE(lmr): the group handles the position, so we just care about width/height here
    const {
      borderTopWidth = 0,
      borderRightWidth = 0,
      borderBottomWidth = 0,
      borderLeftWidth = 0,

      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,

      borderTopColor = DEFAULT_BORDER_COLOR,
      borderRightColor = DEFAULT_BORDER_COLOR,
      borderBottomColor = DEFAULT_BORDER_COLOR,
      borderLeftColor = DEFAULT_BORDER_COLOR,

      borderTopStyle = DEFAULT_BORDER_STYLE,
      borderRightStyle = DEFAULT_BORDER_STYLE,
      borderBottomStyle = DEFAULT_BORDER_STYLE,
      borderLeftStyle = DEFAULT_BORDER_STYLE,
    } = style;

    if (!hasAnyDefined(style, VISIBLE_STYLES)) {
      return layers;
    }

    const backgroundColor = style.backgroundColor || DEFAULT_BACKGROUND_COLOR;

    const frame = makeRect(0, 0, layout.width, layout.height);
    const radii = [
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    ];
    const shapeLayer = makeRectShapeLayer(
      0,
      0,
      layout.width,
      layout.height,
      radii,
      props.resizingConstraint,
    );

    const fill = makeColorFill(backgroundColor);
    const content = makeShapeGroup(frame, [shapeLayer], [fill]);

    if (hasAnyDefined(style, SHADOW_STYLES)) {
      const shadow = [makeShadow(style)];
      if (style.shadowInner) {
        content.style.innerShadows = shadow;
      } else {
        content.style.shadows = shadow;
      }
    }

    if (hasAnyDefined(style, OVERFLOW_STYLES)) {
      if (
        style.overflow === 'hidden' ||
        style.overflow === 'scroll' ||
        style.overflowX === 'hidden' ||
        style.overflowX === 'scroll' ||
        style.overflowY === 'hidden' ||
        style.overflowY === 'scroll'
      ) {
        content.hasClippingMask = true;
      }
    }

    if (
      same(borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) &&
      same(borderTopColor, borderRightColor, borderBottomColor, borderLeftColor) &&
      same(borderTopStyle, borderRightStyle, borderBottomStyle, borderLeftStyle)
    ) {
      // all sides have same border width
      // in this case, we can do everything with just a single shape.
      if (borderTopStyle !== undefined) {
        const borderOptions = makeBorderOptions(borderTopStyle, borderTopWidth);
        if (borderOptions) {
          content.style.borderOptions = borderOptions;
        }
      }

      if (borderTopWidth > 0) {
        content.style.borders = [
          {
            _class: 'border',
            isEnabled: true,
            color: makeColorFromCSS(borderTopColor),
            fillType: FillType.Solid,
            position: BorderPosition.Inside,
            thickness: borderTopWidth,
          },
        ];
      }
      layers.push(content);
    } else {
      content.hasClippingMask = true;
      layers.push(content);

      if (borderTopWidth > 0) {
        const topBorder = makeHorizontalBorder(0, 0, layout.width, borderTopWidth, borderTopColor);
        topBorder.name = 'Border (top)';

        const borderOptions = makeBorderOptions(borderTopStyle, borderTopWidth);
        if (borderOptions) {
          topBorder.style.borderOptions = borderOptions;
        }

        layers.push(topBorder);
      }

      if (borderRightWidth > 0) {
        const rightBorder = makeVerticalBorder(
          layout.width - borderRightWidth,
          0,
          layout.height,
          borderRightWidth,
          borderRightColor,
        );
        rightBorder.name = 'Border (right)';

        const borderOptions = makeBorderOptions(borderRightStyle, borderRightWidth);
        if (borderOptions) {
          rightBorder.style.borderOptions = borderOptions;
        }

        layers.push(rightBorder);
      }

      if (borderBottomWidth > 0) {
        const bottomBorder = makeHorizontalBorder(
          0,
          layout.height - borderBottomWidth,
          layout.width,
          borderBottomWidth,
          borderBottomColor,
        );
        bottomBorder.name = 'Border (bottom)';

        const borderOptions = makeBorderOptions(borderBottomStyle, borderBottomWidth);
        if (borderOptions) {
          bottomBorder.style.borderOptions = borderOptions;
        }

        layers.push(bottomBorder);
      }

      if (borderLeftWidth > 0) {
        const leftBorder = makeVerticalBorder(
          0,
          0,
          layout.height,
          borderLeftWidth,
          borderLeftColor,
        );
        leftBorder.name = 'Border (left)';

        const borderOptions = makeBorderOptions(borderLeftStyle, borderLeftWidth);
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
