import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchRenderer } from './SketchRenderer';
import { makeRect } from '../jsonUtils/models';
import { makeRectShapeLayer, makeShapeGroup } from '../jsonUtils/shapeLayers';
import { TreeNode } from '../types';
import { createBorders } from '../jsonUtils/borders';
import { hasAnyDefined } from '../utils/hasAnyDefined';
import { Props } from '../components/View';

const VISIBLE_STYLES = [
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'shadowSpread',
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

export class ViewRenderer extends SketchRenderer {
  getDefaultGroupName(_props: Props) {
    return 'View';
  }

  renderBackingLayers({
    layout,
    style,
    props,
  }: TreeNode<Props>): (
    | FileFormat.ShapePath
    | FileFormat.Rectangle
    | FileFormat.SymbolMaster
    | FileFormat.Group
    | FileFormat.Polygon
    | FileFormat.Star
    | FileFormat.Triangle
    | FileFormat.ShapeGroup
    | FileFormat.Text
    | FileFormat.SymbolInstance
    | FileFormat.Slice
    | FileFormat.Hotspot
    | FileFormat.Bitmap
  )[] {
    let layers: FileFormat.ShapeGroup[] = [];
    // NOTE(lmr): the group handles the position, so we just care about width/height here
    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
    } = style;

    if (!hasAnyDefined(style, VISIBLE_STYLES)) {
      return layers;
    }

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

    const content = makeShapeGroup(frame, [shapeLayer], style, props.shadows);

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

    const contents = createBorders(content, layout, style);

    layers = layers.concat(contents);

    return layers;
  }
}
