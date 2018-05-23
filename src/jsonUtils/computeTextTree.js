// @flow
import type { TreeNode } from '../types';
import type Context from '../utils/Context';
import { VALID_TEXT_CHILDREN_TYPES } from '../utils/constants';

const walkTextTree = (textTree: TreeNode, context: Context, textNodes: Array<Object>) => {
  if (typeof textTree !== 'string' && !VALID_TEXT_CHILDREN_TYPES.includes(textTree.type)) {
    throw new Error(`"${textTree.type}" is not a valid child for Text components`);
  }

  if (typeof textTree === 'string') {
    textNodes.push({
      textStyles: context.getInheritedStyles(),
      content: textTree,
    });
  }

  if (textTree.children) {
    if (textTree.props && textTree.props.style) {
      context.addInheritableStyles(textTree.props.style);
    }
    for (let index = 0; index < textTree.children.length; index += 1) {
      const textComponent = textTree.children[index];
      walkTextTree(textComponent, context.forChildren(), textNodes);
    }
  }
};

const computeTextTree = (node: TreeNode, context: Context, textNodes: Array<Object> = []) => {
  const { children } = node;

  if (children) {
    const childContext = context.forChildren();
    for (let index = 0; index < children.length; index += 1) {
      const textNode = children[index];
      if (typeof textNode === 'string') {
        textNodes.push({
          content: textNode,
          textStyles: childContext.getInheritedStyles(),
        });
      } else if (textNode.children && textNode.children.length > 0) {
        walkTextTree(textNode, childContext, textNodes);
      }
    }
  }

  return textNodes;
};

export default computeTextTree;
