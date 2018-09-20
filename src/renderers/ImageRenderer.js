// @flow
import type { SJShapeGroupLayer } from 'sketchapp-json-flow-types';
import { PatternFillType } from '../utils/constants';
import SketchRenderer from './SketchRenderer';
import { makeImageDataFromUrl } from '../jsonUtils/hacksForJSONImpl';
// import processTransform from './processTransform';
import { makeRect, makeImageFill, makeJSONDataReference } from '../jsonUtils/models';
import { makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import { createBorders } from '../jsonUtils/borders';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';

function extractURLFromSource(source) {
  if (typeof source === 'string') {
    return source;
  }
  return source.uri;
}

export default class ImageRenderer extends SketchRenderer {
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
  ): Array<SJShapeGroupLayer> {
    let layers = [];

    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
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

    const content = makeShapeGroup(frame, [shapeLayer], style, props.shadows, fills);

    const contents = createBorders(content, layout, style);

    layers = layers.concat(contents);

    return layers;
  }
}
