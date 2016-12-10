/* @flow */
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
import processTransform from './processTransform';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';

const FILL_TYPE = {
  Solid: 0,
  Gradient: 1,
  Pattern: 4,
  Noise: 5,
};

const PATTERN_FILL_TYPE = {
  Tile: 0,
  Fill: 1,
  Stretch: 2,
  Fit: 3,
};

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

    const btlr = style.borderTopLeftRadius || 0;
    const btrr = style.borderTopRightRadius || 0;
    const bbrr = style.borderBottomRightRadius || 0;
    const bblr = style.borderBottomLeftRadius || 0;

    const rect = MSRectangleShape.alloc().init();
    rect.frame = MSRect.rectWithRect(
      NSMakeRect(0, 0, layout.width, layout.height)
    );

    rect.setCornerRadiusFromComponents(`${btlr}/${btrr}/${bbrr}/${bblr}`);

    const layer = MSShapeGroup.shapeWithPath(rect);

    if (style.backgroundColor !== undefined) {
      const fillStyle = layer.style().addStylePartOfType(0);
      fillStyle.color = convertToColor(style.backgroundColor);
    }

    const imageFill = layer.style().addStylePartOfType(0);
    const imageData = NSImage.alloc().initByReferencingURL(NSURL.URLWithString(props.source));
    imageFill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(imageData, false));
    imageFill.setFillType(FILL_TYPE.Pattern);
    imageFill.setPatternFillType(PATTERN_FILL_TYPE[props.resizeMode] || PATTERN_FILL_TYPE.Fill);

    if (style.transform !== undefined) {
      processTransform(rect, layout, style.transform);
    }

    // layer.setRotation(30);


    return [
      layer,
    ];
  }
}

module.exports = ImageRenderer;
