import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from './style';


const TextBox = ({ label, value, children }: Props) => (
  <View style={styles.formElement}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.textbox}>{value}</View>
    {children}
  </View>
);


export default TextBox;
