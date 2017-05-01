import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from './style';
import StrengthMeter from '../StrengthMeter';

const TextBox = ({ label, value, type }: Props) => (
  <View style={styles.formElement}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.textbox}>{value}</View>
    {type === "password" && value.length > 0 && 
      <StrengthMeter
        password={value}
      />
    }
  </View>
);


export default TextBox;
