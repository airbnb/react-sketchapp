import TestRenderer from 'react-test-renderer';
import * as yoga from 'yoga-layout';
import Context from './utils/Context';
import type { TreeNode } from './types';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';
import computeTree from './jsonUtils/computeTree';
import computeTextTree from './jsonUtils/computeTextTree';
import {
  INHERITABLE_FONT_STYLES,
  SKETCH_TREE_OBJECT_STUB,
} from './utils/constants';

const allStringsOrNumbers = xs =>
  xs.every(x => typeof x === 'string' || typeof x === 'number');

const processChildren = xs => (allStringsOrNumbers(xs) ? [xs.join('')] : xs);

const reactTreeToFlexTree = (
  node: TreeNode,
  yogaNode: yoga.NodeInstance,
  context: Context
) => {
  let textNodes;
  let textStyle = context.getInheritedStyles();
  const style = node.props.style || {};

  const children = Array.isArray(node.children)
    ? processChildren(node.children)
    : null;
  const newChildren = [];

  if (node.type === 'text') {
    // If current node is a Text node, add text styles to Context to pass down to
    // child nodes.
    if (
      node.props &&
      node.props.style &&
      hasAnyDefined(style, INHERITABLE_FONT_STYLES)
    ) {
      const inheritableStyles = pick(style, INHERITABLE_FONT_STYLES);
      inheritableStyles.flexDirection = 'row';
      context.addInheritableStyles(inheritableStyles);
      textStyle = {
        ...context.getInheritedStyles(),
        ...inheritableStyles,
      };
    }

    // Compute Text Children
    textNodes = computeTextTree(node, context);
  } else if (children) {
    for (let index = 0; index < children.length; index += 1) {
      const childComponent = children[index];
      const childNode = yogaNode.getChild(index);
      const renderedChildComponent = reactTreeToFlexTree(
        childComponent,
        childNode,
        context.forChildren()
      );
      newChildren.push(renderedChildComponent);
    }
  }

  return Object.assign({}, SKETCH_TREE_OBJECT_STUB, {
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
    props: {
      ...node.props,
      textNodes,
    },
    children: newChildren,
  });
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
