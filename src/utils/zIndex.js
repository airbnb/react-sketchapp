// @flow
import type { TreeNode } from '../types';

// Sort z-index values highest to lowest (opposite if `reverse` is true)
const zIndex = (nodes: Array<TreeNode>, reverse: boolean = false) =>
  nodes
    .map((node: TreeNode, index: number) => ({
      ...node,
      oIndex: index, // Keep track of original index in array
    }))
    .sort((a, b) => {
      const aIndex =
        a.props && a.props.style && a.props.style.zIndex
          ? a.props.style.zIndex
          : 0;
      const bIndex =
        b.props && b.props.style && b.props.style.zIndex
          ? b.props.style.zIndex
          : 0;
      return reverse ? aIndex - bIndex : bIndex - aIndex;
    });

export default zIndex;
