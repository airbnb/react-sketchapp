import TestRenderer from 'react-test-renderer';
import * as yoga from 'yoga-layout';
import Context from './utils/Context';
import type { TreeNode } from './types';
import hasAnyDefined from './utils/hasAnyDefined';
import pick from './utils/pick';
import computeYogaTree from './jsonUtils/computeYogaTree';
import computeTextTree from './jsonUtils/computeTextTree';
import { INHERITABLE_FONT_STYLES } from './utils/constants';
import zIndex from './utils/zIndex';

const reactTreeToFlexTree = (
  node: TreeNode,
  yogaNode: yoga.NodeInstance,
  context: Context
) => {
  let textNodes;
  let textStyle = context.getInheritedStyles();
  const style = node.props && node.props.style ? node.props.style : {};
  const type = node.type || 'text';

  let newChildren = [];

  if (type === 'svg') {
    newChildren = node.children;
  } else if (type === 'text') {
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
    // Recursion reverses the render stacking order, this corrects that
    node.children.reverse();

    // Calculates zIndex order
    const children = zIndex(node.children, true);

    for (let index = 0; index < children.length; index += 1) {
      const childComponent = children[index];
      const childStyles =
        childComponent.props && childComponent.props.styles
          ? childComponent.props.styles
          : {};

      // Since we reversed the order of children and sorted by zIndex, we need
      // to keep track of a decrementing index using the original index of the
      // TreeNode to get the correct layout.
      // NOTE: position: absolute handles zIndexes outside of flex layout, so we
      // need to use the current child index and not it's original index (from
      // before zIndex sorting).
      const decrementIndex =
        children.length -
        1 -
        (childStyles.position === 'absolute' ? index : childComponent.oIndex);
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
  const yogaNode = computeYogaTree(json, new Context());
  yogaNode.calculateLayout(yoga.UNDEFINED, yoga.UNDEFINED, yoga.DIRECTION_LTR);
  const tree = reactTreeToFlexTree(json, yogaNode, new Context());

  return tree;
};

export default buildTree;
