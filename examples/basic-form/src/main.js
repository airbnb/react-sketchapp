import React from 'react';
import PropTypes from 'prop-types';
import { render, StyleSheet, View } from 'react-sketchapp';
import { Text } from 'react-primitives';
import { colors, typography, spacing } from './designSystem';
import type { User } from './types';
import DATA from './data';

import Register from './components/Register';

const Page = ({ sessions }: { sessions: Array<Session> }) => (
  <View>
    <Text style={typography.Heading}>Basic Form w/ DOM elements and React Primitives</Text>
    <Register sessions={sessions} />
  </View>
);

export default (context) => {
  render(<Page sessions={DATA} />, context.document.currentPage());
}