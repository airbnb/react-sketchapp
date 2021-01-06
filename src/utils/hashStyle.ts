import murmurHash from 'murmur2js';
import { sortObjectKeys } from './sortObjectKeys';

export const hashStyle = (obj: { [key: string]: unknown }): string => {
  if (obj) {
    return String(murmurHash(JSON.stringify(sortObjectKeys(obj))));
  }
  return '0';
};
