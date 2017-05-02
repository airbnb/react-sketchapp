import React from 'react';
import PropTypes from 'prop-types';
import { render, StyleSheet, View } from 'react-sketchapp';
import { Text } from 'react-primitives';
import { colors, typography, spacing, typeRamp, fontFamily } from './designSystem';
import type { Session } from './types';
import DATA from './data';
import Register from './components/Register';

const Page = ({ sessions }: { sessions: Array<Session> }) => (
  <View>
    <Text style={typography.Heading}>Basic Form w/ DOM elements and React Primitives</Text>
    {sessions.map(session => (
      <Register 
        session={session}
      />
    ))}
  </View>
);

export default (context) => {
  render(<Page sessions={DATA} />, context.document.currentPage());
}