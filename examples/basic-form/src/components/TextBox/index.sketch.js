import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from './style';
import StrengthMeter from '../StrengthMeter';

type Props = {
  label: string,
  value: string,
  type: string,
  children?: React$Element<any>,
};

const TextBox = ({ label, value, type, children }: Props) => (
  <View style={styles.formElement}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.textbox}>{value}</View>
      {children}
  </View>
);

export default TextBox;
