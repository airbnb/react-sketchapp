/* @flow */
import { BorderPosition, FillType } from 'sketch-constants';
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import processTransform from './processTransform';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

// out of date in sketch-constants
// https://github.com/turbobabr/sketch-constants/pull/1
const PatternFillType = {
  Tile: 0,
  Fill: 1,
  Stretch: 2,
  Fit: 3,
};

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
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): Array<SketchLayer> {
    // TODO: borders

    const bl = style.borderLeftWidth || 0;
    const br = style.borderRightWidth || 0;
    const bt = style.borderTopWidth || 0;
    const bb = style.borderBottomWidth || 0;

    const btlr = style.borderTopLeftRadius || 0;
    const btrr = style.borderTopRightRadius || 0;
    const bbrr = style.borderBottomRightRadius || 0;
    const bblr = style.borderBottomLeftRadius || 0;

    const layers = [];
    const rect = MSRectangleShape.alloc().init();
    rect.frame = MSRect.rectWithRect(
      NSMakeRect(0, 0, layout.width, layout.height)
    );

    rect.setCornerRadiusFromComponents(`${btlr}/${btrr}/${bbrr}/${bblr}`);

    const content = MSShapeGroup.shapeWithPath(rect);

    if (style.backgroundColor !== undefined) {
      const fillStyle = content.style().addStylePartOfType(0);
      fillStyle.color = convertToColor(style.backgroundColor);
    }

    const imageFill = content.style().addStylePartOfType(0);
    const imageData = NSImage.alloc().initByReferencingURL(
      NSURL.URLWithString(extractURLFromSource(props.source))
    );
    imageFill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(imageData, false));
    imageFill.setFillType(FillType.Pattern);
    imageFill.setPatternFillType(PatternFillType[props.resizeMode] || PatternFillType.Fill);

    if (style.transform !== undefined) {
      processTransform(rect, layout, style.transform);
    }

    layers.push(content);

    if (same(bl, br, bt, bb)) {
      const borderStyle = content.style().addStylePartOfType(1);
      borderStyle.setFillType(FillType.Solid); // solid

      if (style.borderTopColor !== undefined) {
        borderStyle.setColor(convertToColor(style.borderTopColor));
      }

      borderStyle.setThickness(style.borderTopWidth || 0);

      borderStyle.setPosition(BorderPosition.Outside);
    } else {
      if (bt > 0) {
        const topBorder = makeRect(
          0,
          0,
          layout.width,
          bt,
          style.borderTopColor
        );
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
        layers.push(rightBorder);
      }
    }

    return layers;
  }
}

module.exports = ImageRenderer;
