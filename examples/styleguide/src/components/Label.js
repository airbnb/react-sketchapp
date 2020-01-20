import * as React from 'react';
import { Text } from 'react-sketchapp';

const Label = ({ bold, children }) => (
  <Text
    style={{
      color: '#333',
      fontWeight: bold ? 'bold' : 'normal',
      fontSize: 16,
      lineHeight: 24,
    }}
  >
    {children}
  </Text>
);

export default Label;
