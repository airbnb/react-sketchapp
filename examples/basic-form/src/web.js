import React from 'react';
// import Register from './components/Register';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: 960,
  flexWrap: 'wrap',
  justifyContent: 'center',
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
      <h1 style={{ fontFamily: "'SF UI Display', 'San Francisco', sans-serif" }}>Register</h1>
    </div>
  </div>
);
