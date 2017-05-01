import { StyleSheet, Text } from 'react-primitives';
import React from 'react'; import { colors, spacing, typeRamp, typography, fontFamily } from './designSystem';
import DATA from './data';
import Register from './components/Register';
import Space from './components/Space';
import TextBox from './components/TextBox/web';
import Button from './components/Button';


const styles = {
  containerStyle: {
    width: 364,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  register: {
    backgroundColor: colors.LightGrey,
    padding: spacing.Large
  },
  heading: {
    color: colors.Purple,
    display: 'block',
    fontSize: typeRamp.Medium,
    fontFamily: fontFamily,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.Medium,
    width: 300
  }
};


export default () => (
  <div>
    <div style={styles.containerStyle}>
      <h1
        style={{...typography.Heading, fontFamily: fontFamily}}>
        Basic Form w/ DOM elements and React Primitives</h1>
      <Register>
        <div style={styles.register}>
          <Text style={{...styles.heading}}>Register an Account</Text>
          <TextBox
            label={"Email"}
            value={""}
            type={"email"}
          />
          <TextBox
            label={"Password"}
            value={""}
            type={"password"}
          />
          <Button
            label={"Register"}
            backgroundColor={colors.Purple}
          />
        </div>
      </Register>
    </div>
  </div>
);
