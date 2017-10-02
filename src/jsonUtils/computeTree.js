// @flow
import * as yoga from 'yoga-layout';
import computeNode from './computeNode';
import Context from '../utils/Context';

const walkTree = (tree: yoga.NodeInstance, context: Context) => {
  const { node, stop } = computeNode(tree, context);

  if (tree.children && tree.children.length > 0) {
    for (let index = 0; index < tree.children.length; index += 1) {
      const childComponent = tree.children[index];
      // Avoid going into <text> node's children
      if (!stop) {
        const childNode = walkTree(childComponent, context.forChildren());
        node.insertChild(childNode, index);
      }
    }
  }

  return node;
};
const treeToNodes = (root: yoga.NodeInstance, context: Context) =>
  walkTree(root, context);

export default treeToNodes;
