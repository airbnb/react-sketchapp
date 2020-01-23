import * as React from 'react';
import { Text, View } from 'react-primitives';
import { spacing, colors, fontFamily } from '../designSystem';

const buttonStyle = {
  borderRadius: 3,
  boxSizing: 'border-box',
  color: colors.White,
  cursor: 'pointer',
  padding: spacing.Medium,
  width: 300,
};

const textStyle = {
  color: colors.White,
  fontFamily,
  fontWeight: 'bold',
  textAlign: 'center',
};

const Button = ({ label, backgroundColor }) => (
  <View style={{ ...buttonStyle, backgroundColor }}>
    <Text style={{ ...textStyle }}>{label}</Text>
  </View>
);

export default Button;
