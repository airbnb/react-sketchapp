/* @flow */
import murmurHash from 'murmur2js';
import sortObjectKeys from './sortObjectKeys';

const hashStyle = (obj: Object): number => {
  if (typeof obj !== 'object') {
    return 0;
  }
  return murmurHash(JSON.stringify(sortObjectKeys(obj)));
};

export default hashStyle;
