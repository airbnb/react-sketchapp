import yoga from 'yoga-layout';
import computeYogaNode from './computeYogaNode';
import { TreeNode } from '../types';
import Context from '../utils/Context';
import zIndex from '../utils/zIndex';

const walkTree = (tree: TreeNode | string, context: Context) => {
  const { node, stop } = computeYogaNode(tree, context);

  if (typeof tree === 'string' || tree.type === 'sketch_svg') {
    // handle svg node, eg: stop here, we will handle the children in the renderer
    return node;
  }

  if (tree.children && tree.children.length > 0) {
    // Calculates zIndex order
    const children = zIndex(tree.children);

    for (let index = 0; index < children.length; index += 1) {
      const childComponent = children[index];
      // Avoid going into <text> node's children
      if (!stop) {
        const childNode = walkTree(childComponent, context.forChildren());
        node.insertChild(childNode, index);
      }
    }
  }

  return node;
};
const treeToNodes = (root: TreeNode, context: Context): yoga.YogaNode => walkTree(root, context);

export default treeToNodes;
