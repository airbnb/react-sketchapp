import React from 'react';
import PropTypes from 'prop-types';
import { render, StyleSheet, View } from 'react-sketchapp';
import { Text } from 'react-primitives';
import { colors, typography, spacing, typeRamp, fontFamily } from './designSystem';
import type { User } from './types';
import DATA from './data';

import Register from './components/Register';
import Space from './components/Space';
import TextBox from './components/TextBox/primitive';
import Button from './components/Button';

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

const Page = ({ sessions }: { sessions: Array<Session> }) => (
  <View>
    <Text style={typography.Heading}>Basic Form w/ DOM elements and React Primitives</Text>
    <Register>
      {sessions.map(session => (
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
      ))}
    </Register>
  </View>
);

export default (context) => {
  render(<Page sessions={DATA} />, context.document.currentPage());
}