import requireObjCBridge from './requireObjCBridge';

import { TextNodes, Size } from '../../types';

export default function createStringMeasurer(textNodes: TextNodes, width: number): Size {
  return requireObjCBridge().createStringMeasurer(textNodes, width);
}
