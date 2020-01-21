import { TextNode, Size, PlatformBridge } from '../types';
import isNaN from './isNaN';

export default function measureString(
  bridge: PlatformBridge,
  textNodes: TextNode[],
  width: number,
): Size {
  const sanitizedWidth = isNaN(width) ? 0 : width;

  return textNodes.length > 0
    ? bridge.createStringMeasurer(textNodes, sanitizedWidth)
    : { width: sanitizedWidth, height: 0 };
}
