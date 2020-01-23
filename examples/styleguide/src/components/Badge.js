import * as React from 'react';
import { View, Text } from 'react-sketchapp';

const Badge = ({ children, filled = false }) => (
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
      {children}
    </Text>
  </View>
);

export default Badge;
