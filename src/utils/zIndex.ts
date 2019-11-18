import { TreeNode } from '../types';

// Sort z-index values lowest to highest
const zIndex = (nodes: Array<TreeNode | string>): Array<TreeNode & { oIndex: number } | string> =>
  nodes
    .map((node, index) => {
      if (typeof node === 'string') {
        return node;
      }
      return {
        ...node,
        oIndex: index, // Keep track of original index in array
      };
    })
    .sort((a, b) => {
      const aIndex =
        typeof a === 'string'
          ? 0
          : a.props && a.props.style && a.props.style.zIndex
          ? a.props.style.zIndex
          : 0;
      const bIndex =
        typeof b === 'string'
          ? 0
          : b.props && b.props.style && b.props.style.zIndex
          ? b.props.style.zIndex
          : 0;
      return aIndex - bIndex;
    });

export default zIndex;
