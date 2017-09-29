import TestRenderer from 'react-test-renderer';
import * as yoga from 'yoga-layout';
import Context from './utils/Context';
import type { TreeNode } from './types';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';
import computeTree from './jsonUtils/computeTree';
import createStringMeasurer from './utils/createStringMeasurer';
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
  let textStyle;

  // if (typeof node === 'string') {
  //   textStyle = context.getInheritedStyles();
  //   const layout = yogaNode ? yogaNode.getComputedLayout() : {};

  // return Object.assign({}, SKETCH_TREE_OBJECT_STUB, {
  //   type: 'text',
  //   layout: {
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     bottom: 0,
  //     width: layout.width || 0,
  //     height: layout.height || 0,
  //   },
  //   textStyle,
  //   value: node,
  // });
  // }

  const style = node.props.style || {};

  // If current node is a Text node, add text styles to Context to pass down to
  // child nodes and pass along all current context styles
  // else, just pass along all current context styles
  if (
    node.type === 'text' &&
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
  } else {
    textStyle = context.getInheritedStyles();
  }

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

    // Handle Text Children
    const textNodes = computeTextTree(node, context);
    const layout = createStringMeasurer(textNodes)(0);
    let value = '';
    textNodes.forEach((textNode) => {
      value += textNode.content;
    });

    return Object.assign({}, SKETCH_TREE_OBJECT_STUB, {
      type: 'text',
      style,
      textNodes,
      layout: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: layout.width || 0,
        height: layout.height || 0,
      },
      textStyle,
      value,
    });
  }

  textStyle = context.getInheritedStyles();

  const children = Array.isArray(node.children)
    ? processChildren(node.children)
    : null;
  const newChildren = [];

  if (children && node.type !== 'text') {
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
    props: node.props,
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
