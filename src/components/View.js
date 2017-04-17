/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.shape({
    ...ViewStylePropTypes,
  }),
  name: PropTypes.string,
  children: PropTypes.node,
};

class View extends React.Component {
  static defaultProps = {
    name: 'View',
  };

  render() {
    return (
      <view name={this.props.name} style={StyleSheet.flatten(this.props.style)}>
        {this.props.children}
      </view>
    );
  }
}

View.propTypes = propTypes;

module.exports = View;
