/* @flow */
import murmurHash from 'murmur2js';
import sortObjectKeys from './sortObjectKeys';

const hashStyle = (obj: Object): number => {
  if (obj) {
    return murmurHash(JSON.stringify(sortObjectKeys(obj)));
  }
  return 0;
};

export default hashStyle;
