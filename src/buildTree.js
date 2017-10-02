import TestRenderer from 'react-test-renderer';
import * as yoga from 'yoga-layout';
import Context from './utils/Context';
import type { TreeNode } from './types';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';
import computeTree from './jsonUtils/computeTree';
import computeTextTree from './jsonUtils/computeTextTree';
import { INHERITABLE_FONT_STYLES } from './utils/constants';

const reactTreeToFlexTree = (
  node: TreeNode,
  yogaNode: yoga.NodeInstance,
  context: Context
) => {
  let textNodes;
  let textStyle = context.getInheritedStyles();
  const style = node.props && node.props.style ? node.props.style : {};
  const type = node.type || 'text';

  const newChildren = [];

  if (type === 'text') {
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
  } else if (node.children && node.children.length > 0) {
    // Recursion reverses the render stacking order, this corrects that.
    node.children.reverse();

    for (let index = 0; index < node.children.length; index += 1) {
      const childComponent = node.children[index];

      // Since we reversed the order of node.children above, we need to keep
      // track of a decrementing index to get the correct Yoga node
      const decrementIndex = node.children.length - 1 - index;
      const childNode = yogaNode.getChild(decrementIndex);

      const renderedChildComponent = reactTreeToFlexTree(
        childComponent,
        childNode,
        context.forChildren()
      );
      newChildren.push(renderedChildComponent);
    }
  }

  return {
    type,
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
