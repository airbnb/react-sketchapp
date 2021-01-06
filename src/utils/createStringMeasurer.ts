import { TextNode, Size, PlatformBridge } from '../types';

function isNaN(num: number): boolean {
  // If the value is obj-c NaN, the only way to check for it is by comparing
  // width to itself (because NaN !== NaN)
  // eslint-disable-next-line no-self-compare
  return Number.isNaN(num) || num !== num;
}

export const createStringMeasurer = (bridge: PlatformBridge) => (textNodes: TextNode[]) => (
  width: number = 0,
): Size => {
  const sanitizedWidth = isNaN(width) ? 0 : width;

  return textNodes.length > 0
    ? bridge.createStringMeasurer(textNodes, sanitizedWidth)
    : { width: sanitizedWidth, height: 0 };
};
