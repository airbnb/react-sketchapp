/* @flow */
import React, { PropTypes } from 'react';
import StyleSheet from '../stylesheet';
import TextStylePropTypes from './TextStylePropTypes';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.shape({
    ...ViewStylePropTypes,
    ...TextStylePropTypes,
  }),
  children: PropTypes.node,
};

class Text extends React.Component {
  render() {
    return (
      <text
        style={StyleSheet.flatten(this.props.style)}
      >
        {this.props.children}
      </text>
    );
  }
}

Text.propTypes = propTypes;

module.exports = Text;
