/* @flow */
import React from 'react';
import { Text } from 'react-primitives';
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
  fontFamily,
  fontWeight: 'bold',
  padding: spacing.Medium,
  textAlign: 'center',
  width: 300,
};

const Button = ({ label, backgroundColor }: Props) => (
  <Text style={{ ...buttonStyle, backgroundColor }}>
    {label}
  </Text>
);

export default Button;
