import { TextStyle } from '../../types';
import weakRequire from '../../utils/weakRequire';

const bridge = weakRequire(module, 'node-sketch-bridge');

export default function findFontName(style: TextStyle): string {
  return bridge.findFontName(style);
}
