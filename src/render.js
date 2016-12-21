import TestRenderer from 'react-test-renderer';
import computeLayout from 'css-layout';
import Context from './utils/Context';
import createStringMeasurer from './utils/createStringMeasurer';
import renderers from './renderers';
import type {
  SketchContext,
  SketchLayer,
  TreeNode,
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
    const textStyle = context.getInheritedStyles();
    // string node
    return {
      type: 'text',
      style: {
        measure: createStringMeasurer(node, textStyle),
      },
      textStyle,
      props: {},
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
      ...context.getInheritedStyles(),
      ...inheritableStyles,
    };
  } else {
    textStyle = context.getInheritedStyles();
  }

  return {
    type: node.type,
    style,
    textStyle,
    props: node.props,
    value: null,
    children: children.map(child => reactTreeToFlexTree(child, context.forChildren())),
  };
};

const renderToSketch = (node: TreeNode, layer: SketchLayer) => {
  const { type, style, textStyle, layout, value, props, children } = node;
  const Renderer = renderers[type];
  if (Renderer == null) {
    throw new Error(`Could not find renderer for type '${type}'`);
  }
  const renderer = new Renderer();
  const groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props, value);
  const backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, value);
  layer.addLayers([
    groupLayer,
  ]);
  groupLayer.addLayers(backingLayers);
  children.map(child => renderToSketch(child, groupLayer));
};

/**
 * Render a React element using a provided SketchContext.
 * @example
 * const onRun = (context) => {
 *   render(<View />, context);
 * }
 */
function render(element: React$Element<any>, context: SketchContext) {
  try {
    const renderer = TestRenderer.create(element);
    const json: TreeNode = renderer.toJSON();
    const tree = reactTreeToFlexTree(json, new Context());
    computeLayout(tree);
    const page: SketchLayer = context.document.currentPage();
    renderToSketch(tree, page);
  } catch (err) {
    // TODO: Make error messaging actually useful
    context.document.showMessage(`ERROR: ${err.name}`);
  }
}

module.exports = render;
