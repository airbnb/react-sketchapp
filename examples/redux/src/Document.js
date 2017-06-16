import React from 'react';
import PropTypes from 'prop-types';
import { Artboard } from 'react-sketchapp';
import { connect } from 'react-redux';
import Swatch from './Swatch';

const Document = ({ colors }) =>
  <Artboard
    name="Swatches"
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    {Object.keys(colors).map(color =>
      <Swatch name={color} hex={colors[color]} key={color} />
    )}
  </Artboard>;

Document.propTypes = {
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  colors: state,
});

export default connect(mapStateToProps)(Document);
