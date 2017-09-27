import TestRenderer from 'react-test-renderer';
import * as yoga from 'yoga-layout';
import Context from './utils/Context';
import type { TreeNode } from './types';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';
import computeTree from './jsonUtils/computeTree';

const INHERITABLE_STYLES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'textAlign',
  'textDecoration',
  'textShadowOffset',
  'textShadowRadius',
  'textShadowColor',
  'textTransform',
  'letterSpacing',
  'lineHeight',
  'writingDirection',
];

const allStringsOrNumbers = xs =>
  xs.every(x => typeof x === 'string' || typeof x === 'number');

const processChildren = xs => (allStringsOrNumbers(xs) ? [xs.join('')] : xs);

const reactTreeToFlexTree = (node, yogaNode, context) => {
  const children = Array.isArray(node.children)
    ? processChildren(node.children)
    : [];
  let textStyle;

  if (typeof node === 'string' || typeof node === 'number') {
    textStyle = context.getInheritedStyles();
    return {
      type: 'text',
      style: {},
      layout: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 0,
        height: 0,
      },
      textStyle,
      props: {},
      value: node,
      children,
    };
  }

  const style = node.props.style || {};

  if (
    node.type === 'text' &&
    node.props.style &&
    hasAnyDefined(style, INHERITABLE_STYLES)
  ) {
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
    layout: {
      left: yogaNode.getComputedLeft(),
      right: yogaNode.getComputedRight(),
      top: yogaNode.getComputedTop(),
      bottom: yogaNode.getComputedBottom(),
      width: yogaNode.getComputedWidth(),
      height: yogaNode.getComputedHeight(),
    },
    props: node.props,
    value: null,
    children: children.map((child, index) =>
      reactTreeToFlexTree(
        child,
        yogaNode.getChild(index),
        context.forChildren()
      )
    ),
  };
};

const buildTree = (element: React$Element<any>): TreeNode => {
  const renderer = TestRenderer.create(element);
  const json: TreeNode = renderer.toJSON();
  const yogaNode = computeTree(json, new Context());
  yogaNode.calculateLayout(yoga.UNDEFINED, yoga.UNDEFINED, yoga.DIRECTION_LTR);
  const tree = reactTreeToFlexTree(json, yogaNode, new Context());

  return tree;
};

export default buildTree;
