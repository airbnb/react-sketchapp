// @flow
import type { TreeNode } from '../types';

// Sort z-index values highest to lowest (if `reverse` if false)
const zIndex = (nodes: Array<TreeNode>, reverse: boolean = false) =>
  nodes.sort((a, b) => {
    const aIndex =
      a.props.style && a.props.style.zIndex ? a.props.style.zIndex : 0;
    const bIndex =
      b.props.style && b.props.style.zIndex ? b.props.style.zIndex : 0;
    return reverse ? bIndex - aIndex : bIndex + aIndex;
  });

export default zIndex;
