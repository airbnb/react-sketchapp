import TestRenderer from 'react-test-renderer';
import computeLayout from 'css-layout';
import Context from './utils/Context';
import createStringMeasurer from './utils/createStringMeasurer';
import type { TreeNode } from './types';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';

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

const reactTreeToFlexTree = (node: TreeNode, context: Context): TreeNode => {
  if (node.type === 'document' || node.type === 'page') {
    throw new Error(
      `
     Problem occured when trying to build sketch layers.
     This error will occur if <Document> and/or <Page> components are being used incorrectly.
     Steps to resolve:
       1. Remove the mount parameter in your render function.
       2. Only use <Document> at the root of your application
       3. Make sure only <Page> components are used as children of <Document>
    `
    );
  }

  if (typeof node === 'string') {
    const textStyle = context.getInheritedStyles();
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

  const children = Array.isArray(node.children)
    ? processChildren(node.children)
    : [];
  const style = node.props.style || {};

  let textStyle;
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
    props: node.props,
    value: null,
    children: children.map(child =>
      reactTreeToFlexTree(child, context.forChildren())
    ),
  };
};

const buildTree = (element: React$Element<any>): TreeNode => {
  const renderer = TestRenderer.create(element);
  const json: TreeNode = renderer.toJSON();
  const tree = reactTreeToFlexTree(json, new Context());
  computeLayout(tree);

  return tree;
};

export default buildTree;
