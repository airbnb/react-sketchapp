/* @flow */
import type { SJShapeGroupLayer } from '@skpm/sketchapp-json-flow-types';
import { BorderPosition } from 'sketch-constants';
import { PatternFillType } from '../utils/constants';
import SketchRenderer from './SketchRenderer';
import { makeImageDataFromUrl } from '../jsonUtils/hacksForJSONImpl';
// import processTransform from './processTransform';
import {
  makeRect,
  makeColorFromCSS,
  makeColorFill,
  makeImageFill,
  makeJSONDataReference,
} from '../jsonUtils/models';
import { makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import {
  makeBorderOptions,
  makeShadow,
  makeHorizontalBorder,
  makeVerticalBorder,
} from '../jsonUtils/style';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';
import hasAnyDefined from '../utils/hasAnyDefined';
import same from '../utils/same';

const TRANSPARENT = 'transparent';
const DEFAULT_BORDER_COLOR = TRANSPARENT;
const DEFAULT_BORDER_STYLE = 'solid';

const SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];

function extractURLFromSource(source) {
  if (typeof source === 'string') {
    return source;
  }
  return source.uri;
}

class ImageRenderer extends SketchRenderer {
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
  ): Array<SJShapeGroupLayer> {
    const layers = [];

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

    const image = makeImageDataFromUrl(extractURLFromSource(props.source));

    const fillImage = makeJSONDataReference(image);

    const frame = makeRect(0, 0, layout.width, layout.height);
    const radii = [
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    ];
    const shapeLayer = makeRectShapeLayer(0, 0, layout.width, layout.height, radii);

    const fills = [makeImageFill(fillImage, PatternFillType[props.resizeMode])];

    if (style.backgroundColor) {
      fills.unshift(makeColorFill(style.backgroundColor));
    }

    const content = makeShapeGroup(frame, [shapeLayer], fills);

    if (hasAnyDefined(style, SHADOW_STYLES)) {
      content.style.shadows = [makeShadow(style)];
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
            fillType: 0,
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

module.exports = ImageRenderer;
