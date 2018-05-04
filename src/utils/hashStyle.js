/* @flow */
import murmurHash from 'murmur2js';
import sortObjectKeys from './sortObjectKeys';

const hashStyle = (obj: Object): number => murmurHash(JSON.stringify(sortObjectKeys(obj)));

export default hashStyle;
