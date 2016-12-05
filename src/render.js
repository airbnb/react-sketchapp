import TestRenderer from 'react/lib/ReactTestRenderer';
import computeLayout from 'css-layout';

import text from './layers/text';
import group from './layers/group';
import view from './layers/view';
import Context from './layers/context';
import createStringMeasurer from './layers/createStringMeasurer';
import type {
  SketchContext,
  SketchLayer,
  TreeNode,
  LayerCreator,
  LayoutInfo,
  ViewStyle,
  TextStyle,
} from './types';

const hasAnyDefined = (obj, names) => names.some(key => obj[key] !== undefined);

const pick = (obj, keys) => {
  const result = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
};

const INHERITABLE_STYLES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'textShadowOffset',
  'textShadowRadius',
  'textShadowColor',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'writingDirection',
];

const reactTreeToFlexTree = (node: TreeNode, context: Context): TreeNode => {
  if (typeof node === 'string') {
    const textStyle = context.getInheritiedStyles();
    // string node
    return {
      type: 'text',
      style: {
        measure: createStringMeasurer(node, textStyle),
      },
      textStyle,
      value: node,
      children: [],
    };
  }

  const children = node.children || [];
  const style = node.props.style || {};

  let textStyle;
  if (node.type === 'text' && node.props.style && hasAnyDefined(style, INHERITABLE_STYLES)) {
    const inheritableStyles = pick(style, INHERITABLE_STYLES);
    context.addInheritableStyles(inheritableStyles);
    textStyle = {
      ...context.getInheritiedStyles(),
      ...inheritableStyles,
    };
  } else {
    textStyle = context.getInheritiedStyles();
  }

  const childContext = context.forChildren();
  return {
    type: node.type,
    style,
    textStyle,
    value: null,
    children: children.map(child => reactTreeToFlexTree(child, childContext)),
  };
};

const layerCreators: { [key: string]: LayerCreator } = {
  view,
  text,
};

const makeLayer = (
  type: string,
  style: ViewStyle,
  layout: LayoutInfo,
  textStyle: TextStyle,
  value: ?string
): SketchLayer => {
  const create = layerCreators[type];
  return create(style, layout, textStyle, value);
};

const renderToSketch = (node: TreeNode, layer: SketchLayer) => {
  const { type, style, textStyle, layout, value, children } = node;
  const groupLayer = group(style, layout, textStyle);
  layer.addLayers([
    groupLayer,
  ]);
  groupLayer.addLayers([
    makeLayer(type, style, layout, textStyle, value),
  ]);
  children.map(child => renderToSketch(child, groupLayer));
};

/**
 *
 * List of things to do:
 * =====================
 * - nested text nodes + view nodes inside of text
 * - border widths
 * - individual border props
 * - individual padding/margin props
 * - text numberOfLines etc.
 * - images
 * - "transform" styles
 * - shadow styles
 */
function render(element: React$Element<any>, context: SketchContext) {
  const renderer = TestRenderer.create(element);
  const json: TreeNode = renderer.toJSON();
  const tree = reactTreeToFlexTree(json, new Context());
  computeLayout(tree);
  const page: SketchLayer = context.document.currentPage();
  renderToSketch(tree, page);
}

module.exports = render;
