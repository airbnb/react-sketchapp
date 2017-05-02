import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { spacing, colors, typeRamp, fontFamily } from '../designSystem';
import Space from './Space';
import TextBox from './TextBox';
import Button from './Button';

const styles = StyleSheet.create({
  register: {
    backgroundColor: colors.LightGrey,
    padding: spacing.Large
  },
  heading: {
    color: colors.Purple,
    fontSize: typeRamp.Medium,
    fontFamily: fontFamily,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.Medium,
    width: 300
  }
});

const Register = ({ session }: Props) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
  >
    <Space key={session.password} h={spacing.Large} v={spacing.Large}>
      <View style={styles.register}>
        <Text style={styles.heading}>Register an Account</Text>
        <TextBox
          label={"Email"}
          value={session.email}
          type={"email"}
        />
        <TextBox
          label={"Password"}
          value={session.password}
          type={"password"}
        />
        <Button
          label={"Register"}
          backgroundColor={colors.Purple}
        />
      </View>
    </Space>
  </View>
);


export default Register;
