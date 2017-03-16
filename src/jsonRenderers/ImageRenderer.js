/* @flow */
import type { SJShapeGroupLayer, SJFillImage } from 'sketchapp-json-flow-types';
import { BorderPosition } from 'sketch-constants';
// import convertToColor from '../utils/convertToColor';
import SketchRenderer from './SketchRenderer';
// import processTransform from './processTransform';
import { makeRect, makeColorFromCSS, makeColorFill, makeImageFill, generateID } from '../jsonUtils/models';
import { makeRectPath, makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import { makeDottedBorder, makeDashedBorder, makeShadow } from '../jsonUtils/style';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle } from '../types';
import hasAnyDefined from '../utils/hasAnyDefined';
import same from '../utils/same';

const DEFAULT_BORDER_COLOR = '#000';
const DEFAULT_BORDER_STYLE = 'solid';

const SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];

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

const makeFillImage = (image): SJFillImage => ({
  _class: 'MSJSONOriginalDataReference',
  _ref: `images/${generateID()}`,
  _ref_class: 'MSImageData',
  data: {
    _data: image
      .data()
      .base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
    // TODO(gold): can I just declare this as a var instead of using Cocoa?
  },
  sha1: {
    _data: image
      .sha1()
      .base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
  },
});

class ImageRenderer extends SketchRenderer {
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string,
  ): Array<SJShapeGroupLayer> {
    const layers = [];

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

    const imageData = NSImage.alloc().initByReferencingURL(
      NSURL.URLWithString(extractURLFromSource(props.source)),
    );

    const image = MSImageData.alloc().initWithImage_convertColorSpace(imageData, false);

    const fillImage = makeFillImage(image);

    const frame = makeRect(0, 0, layout.width, layout.height);
    const radii = [btlr, btrr, bbrr, bblr];
    const shapeLayer = makeRectShapeLayer(0, 0, layout.width, layout.height, radii);

    const fills = [
      makeImageFill(fillImage),
    ];

    if (style.backgroundColor) {
      fills.unshift(makeColorFill(style.backgroundColor));
    }

    const content = makeShapeGroup(frame, [shapeLayer], fills);

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
      layers.push(content);
    }

    return layers;

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
