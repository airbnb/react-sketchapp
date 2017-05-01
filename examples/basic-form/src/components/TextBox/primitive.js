import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from './style';


const TextBox = ({ label, value }: Props) => (
  <View style={styles.formElement}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.textbox}>{value}</View>
  </View>
);


export default TextBox;
