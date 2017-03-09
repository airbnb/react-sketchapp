/* @flow */
import { BorderPosition, FillType } from 'sketch-constants';
import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
// import processTransform from './processTransform';
import { makeRect, makeColorFromCSS } from '../jsonUtils/models';
import { makeRectPath, makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
import imageTree from './imageTree';

// out of date in sketch-constants
// https://github.com/turbobabr/sketch-constants/pull/1
const PatternFillType = {
  Tile: 0,
  Fill: 1,
  Stretch: 2,
  Fit: 3,
};

function extractURLFromSource(source) {
  if (typeof source === 'string') {
    return source;
  }
  return source.uri;
}

type SJImageFill = {
  _class: 'MSJSONOriginalDataReference',
  _ref: string,
  _ref_class: 'MSImageData',
  data: {
    _data: string,
  },
  sha1: {
    _data: string,
  };
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
    // TODO(gold): Implement ImageRenderer #sketch43

    const imageData = NSImage.alloc().initByReferencingURL(
      NSURL.URLWithString(extractURLFromSource(props.source))
    );

    const image = MSImageData.alloc().initWithImage_convertColorSpace(imageData, false);

    const imageFill = {
      _class: 'MSJSONOriginalDataReference',
      _ref: '123123', // TODO(gold): "images/string" - idk where the ref comes from
      _ref_class: 'MSImageData',
      data: {
        _data: image.data().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
      },
      sha1: {
        _data: image.sha1().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
      },
    };


    const frame = makeRect(0, 0, layout.width, layout.height);
    const radii = [10, 10, 10, 10];
    const shapeLayer = makeRectShapeLayer(0, 0, layout.width, layout.height, radii);
    const content = makeShapeGroup(frame, [shapeLayer], 'red');
    // TODO(jg): set the fill properly tho
    content.style.fills[0].fillType = 4;
    content.style.fills[0].image = imageFill;
    return [content];

    // const bl = style.borderLeftWidth || 0;
    // const br = style.borderRightWidth || 0;
    // const bt = style.borderTopWidth || 0;
    // const bb = style.borderBottomWidth || 0;
    //
    // const btlr = style.borderTopLeftRadius || 0;
    // const btrr = style.borderTopRightRadius || 0;
    // const bbrr = style.borderBottomRightRadius || 0;
    // const bblr = style.borderBottomLeftRadius || 0;
    //
    // const layers = [];
    // const rect = MSRectangleShape.alloc().init();
    // rect.frame = MSRect.rectWithRect(
    //   NSMakeRect(0, 0, layout.width, layout.height)
    // );
    //
    // rect.setCornerRadiusFromComponents(`${btlr}/${btrr}/${bbrr}/${bblr}`);
    //
    // const content = MSShapeGroup.shapeWithPath(rect);
    //
    // if (style.backgroundColor !== undefined) {
    //   const fillStyle = content.style().addStylePartOfType(0);
    //   fillStyle.color = convertToColor(style.backgroundColor);
    // }
    //
    // const imageFill = content.style().addStylePartOfType(0);
    // const imageData = NSImage.alloc().initByReferencingURL(
    //   NSURL.URLWithString(extractURLFromSource(props.source))
    // );
    // imageFill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(imageData, false));
    // imageFill.setFillType(FillType.Pattern);
    // imageFill.setPatternFillType(PatternFillType[props.resizeMode] || PatternFillType.Fill);
    //
    // if (style.transform !== undefined) {
    //   processTransform(rect, layout, style.transform);
    // }
    //
    // layers.push(content);
    //
    // if (same(bl, br, bt, bb)) {
    //   const borderStyle = content.style().addStylePartOfType(1);
    //   borderStyle.setFillType(FillType.Solid); // solid
    //
    //   if (style.borderTopColor !== undefined) {
    //     borderStyle.setColor(convertToColor(style.borderTopColor));
    //   }
    //
    //   borderStyle.setThickness(style.borderTopWidth || 0);
    //
    //   borderStyle.setPosition(BorderPosition.Outside);
    // } else {
    //   if (bt > 0) {
    //     const topBorder = makeRect(
    //       0,
    //       0,
    //       layout.width,
    //       bt,
    //       style.borderTopColor
    //     );
    //     layers.push(topBorder);
    //   }
    //
    //   if (bl > 0) {
    //     const leftBorder = makeRect(
    //       0,
    //       0,
    //       bl,
    //       layout.height,
    //       style.borderLeftColor
    //     );
    //     layers.push(leftBorder);
    //   }
    //
    //   if (bb > 0) {
    //     const bottomBorder = makeRect(
    //       0,
    //       layout.height - bb,
    //       layout.width,
    //       bb,
    //       style.borderBottomColor
    //     );
    //     layers.push(bottomBorder);
    //   }
    //
    //   if (br > 0) {
    //     const rightBorder = makeRect(
    //       layout.width - br,
    //       0,
    //       br,
    //       layout.height,
    //       style.borderRightColor
    //     );
    //     layers.push(rightBorder);
    //   }
    // }
    //
    // return layers;
  }
}

module.exports = ImageRenderer;
