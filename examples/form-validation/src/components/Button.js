// @flow
import * as React from 'react';
import { Text, View } from 'react-primitives';
import { spacing, colors, fontFamily } from '../designSystem';

type Props = {
  label: string,
  backgroundColor: string,
};

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

const Button = ({ label, backgroundColor }: Props) => (
  <View style={{ ...buttonStyle, backgroundColor }}>
    <Text style={{ ...textStyle }}>{label}</Text>
  </View>
);

export default Button;
