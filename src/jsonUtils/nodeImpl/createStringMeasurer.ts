import requireObjCBridge from './requireObjCBridge';

import { TextNode, Size } from '../../types';

export default function createStringMeasurer(textNodes: TextNode[], width: number): Size {
  return requireObjCBridge().createStringMeasurer(textNodes, width);
}
