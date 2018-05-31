// @flow
import * as React from 'react';
import { View, Text } from 'react-primitives';
import { colors, fontFamily, spacing, typeRamp } from '../designSystem';

type Props = {
  password: string,
};

const strengths = {
  short: {
    width: 75,
    label: 'Too short',
    backgroundColor: colors.Rose,
  },
  fair: {
    width: 150,
    label: 'Fair',
    backgroundColor: colors.Yellow,
  },
  good: {
    width: 225,
    label: 'Good',
    backgroundColor: colors.Yellow,
  },
  strong: {
    width: 300,
    label: 'Strong',
    backgroundColor: colors.Green,
  },
};

const styles = {
  meter: {
    boxSizing: 'border-box',
    height: 5,
    width: 300,
    backgroundColor: '#ddd',
    marginTop: spacing.Medium,
    marginBottom: spacing.Large,
    borderRadius: 5,
  },
  innerMeter: {
    boxSizing: 'border-box',
    height: 5,
    borderRadius: 5,
  },
  meterLabel: {
    fontFamily,
    textAlign: 'right',
    width: 300,
    fontSize: typeRamp.Small,
    marginTop: 5,
  },
};

const passwordStrength = (password) => {
  // Faux password checking
  if (password.length <= 6) {
    return 'short';
  } else if (password.length <= 9) {
    return 'fair';
  } else if (password.length <= 12) {
    return 'good';
  }

  return 'strong';
};

const StrengthMeter = ({ password }: Props) => (
  <View>
    {password.length > 0 && (
      <View style={styles.meter}>
        <View
          style={{
            ...styles.innerMeter,
            width: strengths[passwordStrength(password)].width,
            backgroundColor: strengths[passwordStrength(password)].backgroundColor,
          }}
        />
        <Text
          style={{
            ...styles.meterLabel,
            color: strengths[passwordStrength(password)].backgroundColor,
          }}
        >
          {strengths[passwordStrength(password)].label}
        </Text>
      </View>
    )}
  </View>
);

export default StrengthMeter;
