import requireObjCBridge from './requireObjCBridge';
import { TextStyle } from '../../types';

export default function findFontName(style: TextStyle): string {
  return requireObjCBridge().findFontName(style);
}
