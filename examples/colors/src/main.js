import * as React from 'react';
import * as PropTypes from 'prop-types';
import { render, StyleSheet, View } from 'react-sketchapp';
import chroma from 'chroma-js';
import { times } from 'ramda';

const styles = StyleSheet.create({
  container: {
    width: 480,
    height: 480,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

const Document = ({ colors, steps }) => {
  const color = chroma.scale(colors);

  return (
    <View style={styles.container}>
      {times(i => color(i / steps).hex(), steps).map((val, i) => (
        <View
          name={val}
          key={val}
          style={{
            backgroundColor: val,
            margin: 2,
            // prettier-ignore
            height: 96 - (2 * i),
            // prettier-ignore
            width: 96 - (2 * i),
            borderRadius: 2 * i,
          }}
        />
      ))}
    </View>
  );
};
Document.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  steps: PropTypes.number,
};

export default () => {
  render(
    <Document colors={['#01FFD8', '#C137E3', '#8702ED']} steps={50} />,
    context.document.currentPage(),
  );
};
