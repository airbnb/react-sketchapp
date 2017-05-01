import React from 'react';
import Register from './components/Register';
import { typography, fontFamily } from './designSystem';
import DATA from './data';

const containerStyle = {
  width: 364,
  marginLeft: 'auto',
  marginRight: 'auto'
}

/*
 * Using a mix of primitives and DOM elements here to create an
 * interactive web version and an export of different states
 * to sketch.
 */
export default () => (
  <div>
    <div style={containerStyle}>
      <h1
        style={{...typography.Heading, fontFamily: fontFamily}}>
        Basic Form w/ DOM elements and React Primitives</h1>
      <Register
        sessions={DATA}
        isWeb
      />
    </div>
  </div>
);
