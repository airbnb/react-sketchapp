import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { colors, spacing, typeRamp, fontFamily } from '../designSystem';

import TextBoxPrimitive from './TextBox/primitive';
import TextBoxWeb from './TextBox/web';
import Button from './Button';
import StrengthMeter from './StrengthMeter';


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


const Register = ({ sessions, isWeb }: Props) => (
  <View>
    {!isWeb && sessions.map(session => (
      <View style={styles.register}>
        <Text style={styles.heading}>Register an Account</Text>
        <TextBoxPrimitive
          label={"Email"}
          value={session.email}
        />
        <TextBoxPrimitive
          label={"Password"}
          value={session.password}
        />
        {session.password.length > 0 &&
          <StrengthMeter
            password={session.password}
          />
        }
        <Button
          label={"Register"}
          backgroundColor={colors.Purple}
        />
      </View>
    ))}

    {isWeb && 
      <View style={styles.register}>
        <Text style={styles.heading}>Register an Account</Text>
        <TextBoxWeb
          label={"Email"}
          value={""}
          type={"email"}
        />
        <TextBoxWeb
          label={"Password"}
          value={""}
          type={"password"}
        />
        <StrengthMeter
          password={""}
        />
        <Button
          label={"Register"}
          backgroundColor={colors.Purple}
        />
      </View>
    }
  </View>
);


export default Register;
