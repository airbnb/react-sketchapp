/* @flow */
import React from 'react';
import Text from './Text';
import View from './View';

type P = {
  filled?: bool,
  children?: React$Element<any>,
}
const Badge = ({ children, filled }: P) =>
  <View
    style={{
      borderRadius: 4,
      backgroundColor: filled ? '#333' : 'transparent',
      paddingLeft: 8,
      paddingRight: 8,
      borderWidth: 1,
      borderColor: '#333',
    }}
  >
    <Text
      style={{
        color: filled ? '#fff' : '#333',
      }}
    >
      { children }
    </Text>
  </View>;

export default Badge;
