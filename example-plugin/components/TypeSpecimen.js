/* @flow */
import React from 'react';
import Text from './Text';

type P = {
  name: string,
  style: any,
}
const TypeSpecimen = ({ name, style }: P) =>
  <Text
    style={{
      ...style,
      color: '#333',
    }}
  >
    {name}
  </Text>;

export default TypeSpecimen;
