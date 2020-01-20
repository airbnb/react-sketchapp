import weakRequire from '../../utils/weakRequire';
import { TextNode, Size } from '../../types';

const bridge = weakRequire(module, 'node-sketch-bridge');

export default function createStringMeasurer(textNodes: TextNode[], width: number): Size {
  return bridge.createStringMeasurer(textNodes, width);
}
