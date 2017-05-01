import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { spacing, colors, fontFamily } from '../designSystem';

const buttonStyle = {
  borderRadius: 3,
  boxSizing: 'border-box',
  color: colors.White,
  fontFamily: fontFamily,
  padding: spacing.Medium,
  textAlign: 'center',
  width: 260
}


const Button = ({ label, backgroundColor }: Props) => (
  <Text style={{...buttonStyle, backgroundColor: backgroundColor}}>
    {label}
  </Text>
);


export default Button;
