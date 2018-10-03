import * as React from 'react';
import { typography, fontFamily } from './designSystem';
import Register from './components/Register';

const styles = {
  containerStyle: {
    width: 364,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default () => (
  <div>
    <div style={styles.containerStyle}>
      <h1
        style={{
          ...typography.Heading,
          fontFamily,
        }}
      >
        Form Validation w/ DOM elements and React Primitives. Type a password!{' '}
        <span role="img" aria-label="icon">
          👀
        </span>
      </h1>
      <Register />
    </div>
  </div>
);
