import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeColorFromCSS, emptyGradient } from './models';
import { ViewStyle, LayoutInfo, BorderStyle } from '../types';
import same from '../utils/same';
import { makeVerticalBorder, makeHorizontalBorder } from './shapeLayers';
import { makeBorderOptions } from './style';

const DEFAULT_BORDER_COLOR = 'transparent';
const DEFAULT_BORDER_STYLE = 'solid';

export const createUniformBorder = (
  width: number,
  color: string,
  style: BorderStyle = 'solid',
  position: FileFormat.BorderPosition = FileFormat.BorderPosition.Center,
  lineCapStyle: FileFormat.LineCapStyle = FileFormat.LineCapStyle.Butt,
  lineJoinStyle: FileFormat.LineJoinStyle = FileFormat.LineJoinStyle.Miter,
): { borderOptions: FileFormat.BorderOptions; borders: FileFormat.Border[] } => {
  const borderOptions = makeBorderOptions(style, width, lineCapStyle, lineJoinStyle);

  const borders: FileFormat.Border[] = [
    {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: FileFormat.FillType.Color,
      position,
      thickness: width,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: FileFormat.BlendMode.Normal,
        opacity: 1,
      },
      gradient: emptyGradient,
    },
  ];

  return { borderOptions, borders };
};

/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
export const createBorders = (
  content: FileFormat.ShapeGroup,
  layout: LayoutInfo,
  style?: ViewStyle,
): FileFormat.ShapeGroup[] => {
  if (!style) {
    return [content];
  }

  const {
    borderTopWidth = 0,
    borderRightWidth = 0,
    borderBottomWidth = 0,
    borderLeftWidth = 0,

    borderTopColor = DEFAULT_BORDER_COLOR,
    borderRightColor = DEFAULT_BORDER_COLOR,
    borderBottomColor = DEFAULT_BORDER_COLOR,
    borderLeftColor = DEFAULT_BORDER_COLOR,

    borderTopStyle = DEFAULT_BORDER_STYLE,
    borderRightStyle = DEFAULT_BORDER_STYLE,
    borderBottomStyle = DEFAULT_BORDER_STYLE,
    borderLeftStyle = DEFAULT_BORDER_STYLE,
  } = style;

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
      content.style.borders = createUniformBorder(
        borderTopWidth,
        borderTopColor,
        'solid',
        FileFormat.BorderPosition.Outside,
      ).borders;
      const backingLayer = content.layers ? content.layers[0] : undefined;
      if (backingLayer) {
        backingLayer.frame.x += borderTopWidth;
        backingLayer.frame.y += borderTopWidth;
        backingLayer.frame.width -= borderTopWidth * 2;
        backingLayer.frame.height -= borderTopWidth * 2;
      }
    }

    return [content];
  }

  content.hasClippingMask = true;

  const layers = [content];

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
    const leftBorder = makeVerticalBorder(0, 0, layout.height, borderLeftWidth, borderLeftColor);
    leftBorder.name = 'Border (left)';

    const borderOptions = makeBorderOptions(borderLeftStyle, borderLeftWidth);
    if (borderOptions) {
      leftBorder.style.borderOptions = borderOptions;
    }

    layers.push(leftBorder);
  }

  return layers;
};
