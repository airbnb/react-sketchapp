/* @flow */
import murmurHash from './murmurHash';
import sortObjectKeys from './sortObjectKeys';

const hashStyle = (obj: Object): string =>
  murmurHash(
    JSON.stringify(
      sortObjectKeys(obj)
    )
  );

export default hashStyle;
