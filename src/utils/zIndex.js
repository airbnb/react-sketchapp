// @flow
import type { TreeNode } from '../types';

// Sort z-index values lowest to highest
const zIndex = (nodes: Array<TreeNode>): Array<TreeNode & { oIndex: number }> =>
  nodes
    .map((node, index) => ({
      ...node,
      oIndex: index, // Keep track of original index in array
    }))
    .sort((a, b) => {
      const aIndex = a.props && a.props.style && a.props.style.zIndex ? a.props.style.zIndex : 0;
      const bIndex = b.props && b.props.style && b.props.style.zIndex ? b.props.style.zIndex : 0;
      return aIndex - bIndex;
    });

export default zIndex;
