/* @flow */
import React, { PropTypes } from 'react';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.shape({
    ...ViewStylePropTypes,
  }),
  children: PropTypes.node,
};

class View extends React.Component {
  render() {
    return (
      <view
        style={StyleSheet.flatten(this.props.style)}
      >
        {this.props.children}
      </view>
    );
  }
}

View.propTypes = propTypes;

module.exports = View;
