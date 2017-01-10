/* @flow */
import React from 'react';
import { Text } from '../../src';

type P = {
  bold?: boolean,
  children?: any,
}
const Label = ({ bold, children }: P) =>
  <Text
    style={{
      color: '#333',
      fontWeight: bold ? 'bold' : 'normal',
      fontSize: 16,
      lineHeight: 24,
    }}
  >
    { children }
  </Text>;

export default Label;
