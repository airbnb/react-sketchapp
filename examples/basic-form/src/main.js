import React from 'react';
import PropTypes from 'prop-types';
import { render, StyleSheet, View } from 'react-sketchapp';
import { Text } from 'react-primitives';
import { colors, typography, spacing, typeRamp, fontFamily } from './designSystem';
import type { Session } from './types';
import DATA from './data';
import Register from './components/Register';
import Space from './components/Space';

const Page = ({ sessions }: { sessions: Array<Session> }) => (
  <View>
    <Text style={typography.Heading}>Basic Form w/ DOM elements and React Primitives</Text>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {sessions.map(session => (
        <Space key={session.password} h={spacing.Large} v={spacing.Large}>
          <Register 
            session={session}
          />
        </Space>
      ))}
    </View>
  </View>
);

export default (context) => {
  render(<Page sessions={DATA} />, context.document.currentPage());
}