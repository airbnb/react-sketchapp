import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchRenderer } from './SketchRenderer';
import { getImageDataFromURL } from '../utils/getImageDataFromURL';
// import processTransform from './processTransform';
import { makeRect, makeImageFill, makeJSONDataReference, generateID } from '../jsonUtils/models';
import { makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import { createBorders } from '../jsonUtils/borders';
import { TreeNode } from '../types';
import { Props } from '../components/Image';

function extractURLFromSource(source?: string | { uri?: string } | null): string | undefined {
  if (typeof source === 'string') {
    return source;
  }
  return (source || {}).uri;
}

export class ImageRenderer extends SketchRenderer {
  renderBackingLayers({
    layout,
    style,
    props,
  }: TreeNode<Props & { resizeMode?: FileFormat.PatternFillType }>) {
    let layers: FileFormat.ShapeGroup[] = [];

    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
    } = style;

    const url = extractURLFromSource(props.source);

    const image = getImageDataFromURL(this.platformBridge)(url);

    const fillImage = makeJSONDataReference(image);

    const frame = makeRect(0, 0, layout.width, layout.height);
    const radii = [
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    ];
    const shapeLayer = makeRectShapeLayer(0, 0, layout.width, layout.height, radii);

    const fills = [makeImageFill(fillImage, props.resizeMode)];

    const content = makeShapeGroup(frame, [shapeLayer], style, props.shadows, fills);

    // try to keep a constant ID based on the URL
    content.do_objectID = generateID(url);

    const contents = createBorders(content, layout, style);

    layers = layers.concat(contents);

    return layers;
  }
}
