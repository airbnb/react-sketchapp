// @flow
import * as yoga from 'yoga-layout';
import computeNode from './computeNode';
import Context from '../utils/Context';

const recurseTree = (tree: yoga.NodeInstance, context: Context) => {
  const node = computeNode(tree, context);

  if (tree.children) {
    for (let index = 0; index < tree.children.length; index += 1) {
      const childComponent = tree.children[index];
      // Ignore Text nodes
      if (!(typeof childComponent === 'string')) {
        const childNode = recurseTree(childComponent, context.forChildren());
        node.insertChild(childNode, index);
      }
    }
  }

  return node;
};
const treeToNodes = (root: yoga.NodeInstance, context: Context) =>
  recurseTree(root, context);

export default treeToNodes;
