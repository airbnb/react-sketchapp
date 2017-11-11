/* @flow */
import ViewRenderer from './ViewRenderer';
import type {
  SketchLayer,
  ViewStyle,
  LayoutInfo,
  TextStyle,
  TreeNode,
} from '../types';
import { makeSvgLayer } from '../jsonUtils/hacksForJSONImpl';

function toSnakeCase(string: String) {
  return string.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
}

function makeSvgString({ type, props, children }) {
  if (props && props.textNodes) {
    return props.textNodes.reduce(
      (prev, textNode) => prev + textNode.content,
      ''
    );
  }
  if (type.indexOf('svg_') !== 0) {
    throw new Error(
      `Could not render type '${
        type
      }'. Make sure to only have <Svg.*> components inside <Svg>.`
    );
  }

  const cleanedType = type.slice(4);
  const attributes = Object.keys(props || {}).reduce(
    (prev, k) => (props[k] ? `${prev} ${toSnakeCase(k)}="${props[k]}"` : prev),
    ''
  );

  return `<${cleanedType} ${attributes}>
  ${(children || []).reduce((prev, c) => prev + makeSvgString(c), '')}
</${cleanedType}>`;
}

class SvgRenderer extends ViewRenderer {
  getDefaultGroupName(props: any) {
    return props.name || 'Svg';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    children: ?Array<TreeNode>
  ): Array<SketchLayer> {
    const layers = super.renderBackingLayers(
      layout,
      style,
      textStyle,
      props,
      children
    );

    const svgString = makeSvgString({
      type: 'svg_svg',
      props,
      children,
    });
    const svgLayer = makeSvgLayer(layout, 'Shape', svgString);

    layers.push(svgLayer);

    return layers;
  }
}

module.exports = SvgRenderer;
