// @flow
import ViewRenderer from './ViewRenderer';
import type { SketchLayer, ViewStyle, LayoutInfo, TextStyle, TreeNode } from '../types';
import { makeSvgLayer } from '../jsonUtils/hacksForJSONImpl';

const snakeExceptions = [
  'gradientUnits',
  'gradientTransform',
  'patternUnits',
  'patternTransform',
  'stdDeviation',
  'numOctaves',
  'specularExponent',
  'specularConstant',
  'surfaceScale',
];
function toSnakeCase(string: string) {
  if (string === 'href') {
    return 'xlink:href';
  }
  if (snakeExceptions.indexOf(string) !== -1) {
    return string;
  }
  return string.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
}

function makeSvgString(el) {
  if (typeof el === 'string') {
    return el;
  }
  const { type, props, children } = el;

  if (props && props.textNodes) {
    return props.textNodes.reduce((prev, textNode) => prev + textNode.content, '');
  }

  if (!type || type.indexOf('svg_') !== 0) {
    throw new Error(
      `Could not render type '${type}'. Make sure to only have <Svg.*> components inside <Svg>.`,
    );
  }

  const cleanedType = type.slice(4);
  const attributes = Object.keys(props || {}).reduce(
    (prev, k) => (props[k] ? `${prev} ${toSnakeCase(k)}="${props[k]}"` : prev),
    '',
  );

  let string = `<${cleanedType}${attributes}`;

  if (!children || !children.length) {
    string += '/>\n';
  } else {
    string += '>\n';
    string += (children || []).reduce((prev, c) => `${prev}  ${makeSvgString(c)}`, '');
    string += `</${cleanedType}>\n`;
  }

  return string;
}

export default class SvgRenderer extends ViewRenderer {
  getDefaultGroupName(props: any) {
    return props.name || 'Svg';
  }
  renderBackingLayers(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    children: ?Array<TreeNode>,
  ): Array<SketchLayer> {
    const layers = super.renderBackingLayers(layout, style, textStyle, props);

    // add the "xmlns:xlink" namespace to we can use `href`
    // eslint-disable-next-line
    props['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';

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
