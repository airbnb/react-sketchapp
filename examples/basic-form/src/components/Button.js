import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { spacing, colors } from '../designSystem';


const styles = StyleSheet.create({
  button: {
    color: colors.White,
    backgroundColor: colors.Rose,
    padding: spacing.Medium,
    textAlign: 'center',
    width: 260
  }
});

const buttonStyle = {
  color: colors.White,
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
