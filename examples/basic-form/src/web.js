import { Text } from 'react-primitives';
import React from 'react';
import { colors, spacing, typeRamp, typography, fontFamily } from './designSystem';
import Register from './components/Register';



const styles = {
  containerStyle: {
    width: 364,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};


export default () => (
  <div>
    <div style={styles.containerStyle}>
      <h1
        style={{
          ...typography.Heading,
          fontFamily: fontFamily
        }}>Basic Form w/ DOM elements and React Primitives. Type a password! 👀</h1>
      <Register
        session={{email: '', password: ''}}/>
    </div>
  </div>
);
