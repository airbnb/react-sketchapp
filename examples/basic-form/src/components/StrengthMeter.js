import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { colors } from '../designSystem';

const strengths = {
  short: {
    width: 75,
    label: 'Too short',
    backgroundColor: colors.Rose
  },
  fair: {
    width: 150,
    label: 'Fair',
    backgroundColor: colors.Yellow
  },
  good: {
    width: 225,
    label: 'Good',
    backgroundColor: colors.Yellow
  },
  strong: {
    width: 300,
    label: 'Strong',
    backgroundColor: colors.Green
  }
}

const styles = StyleSheet.create({
  meter: {
    boxSizing: 'border-box',
    height: 5,
    width: 300,
    boxSizing: 'border-box',
    backgroundColor: '#ddd',
    marginTop: 0,
    marginBottom: 40,
    borderRadius: 5
  },
  innerMeter: {
    height: 5,
    width: 100,
    backgroundColor: 'yellow',
    borderRadius: 5
  },
  meterLabel: {
    textAlign: 'right',
    width: 300,
    fontSize: 13,
    marginTop: 5
  }
});

const passwordStrength = (password) => {

  // Faux strength checking

  if(password.length <= 5) {
    return 'short';
  } else if (password.length <= 10) {
    return 'fair';
  } else if (password.length <= 12) {
    return 'good';
  }

  return 'strong';
}

const StrengthMeter = ({ password }: Props) => (
  <View style={styles.meter}>
    <View 
      style={{
        boxSizing: 'border-box',
        height: 5,
        width: strengths[passwordStrength(password)].width,
        backgroundColor: strengths[passwordStrength(password)].backgroundColor,
        borderRadius: 5
      }}>
    </View>
    <Text style={{
      textAlign: 'right',
      width: 300,
      fontSize: 13,
      marginTop: 5,
      fontFamily: 'GT Walsheim',
      color: strengths[passwordStrength(password)].backgroundColor,
    }}>{strengths[passwordStrength(password)].label}</Text>
  </View>
);


export default StrengthMeter;