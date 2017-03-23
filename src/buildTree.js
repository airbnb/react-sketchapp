import TestRenderer from 'react-test-renderer';
import computeLayout from 'css-layout';
import Context from './utils/Context';
import createStringMeasurer from './utils/createStringMeasurer';
import type { TreeNode } from './types';
import { timeFunction } from './debug';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';

const INHERITABLE_STYLES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'textShadowOffset',
  'textShadowRadius',
  'textShadowColor',
  'textTransform',
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

const buildTree = (element: React$Element<any>): TreeNode => {
  const renderer = TestRenderer.create(element);
  const json: TreeNode = renderer.toJSON();
  const tree = timeFunction(
    () => reactTreeToFlexTree(json, new Context()),
    '- reactTreeToFlexTree',
  );
  timeFunction(() => computeLayout(tree), '- computeLayout');

  return tree;
};

export default buildTree;
