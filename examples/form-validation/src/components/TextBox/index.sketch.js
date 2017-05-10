/* @flow */
import React from 'react';
import { View, Text } from 'react-primitives';
import styles from './style';

type Props = {
  label: string,
  value: string,
  children?: React$Element<any>,
};

const TextBox = ({ label, value, children }: Props) => (
  <View style={styles.formElement}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.textbox}>{value}</View>
    {children}
  </View>
);

export default TextBox;
