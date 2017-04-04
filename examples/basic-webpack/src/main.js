import React, { PropTypes } from 'react';
import { render, StyleSheet, Text, View } from 'react-sketchapp';

const styles = StyleSheet.create({
  container: {
    width: 640,
    height: 480,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#dfba69',
    borderRadius: 4,
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    lineHeight: 24,
    color: '#dfba69',
    textAlign: 'center',
  },
});

const Document = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {message}
    </Text>
  </View>
);
Document.propTypes = { message: PropTypes.string };

const onRun = (context) => {
  render(<Document message="Hello from Webpack!" />, context);
};

module.exports = onRun;
