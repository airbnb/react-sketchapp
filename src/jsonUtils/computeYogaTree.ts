import yoga from 'yoga-layout-prebuilt';
import { ReactTestRendererNode } from 'react-test-renderer';
import { PlatformBridge } from '../types';
import { computeYogaNode } from './computeYogaNode';
import { Context } from '../utils/Context';
import { zIndex } from '../utils/zIndex';

const walkTree = (bridge: PlatformBridge) => (tree: ReactTestRendererNode, context: Context) => {
  const { node, stop } = computeYogaNode(bridge)(tree, context);

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
        const childNode = walkTree(bridge)(childComponent, context.forChildren());
        node.insertChild(childNode, index);
      }
    }
  }

  return node;
};

export const computeYogaTree = (bridge: PlatformBridge) => (
  root: ReactTestRendererNode,
  context: Context,
): yoga.YogaNode => walkTree(bridge)(root, context);
