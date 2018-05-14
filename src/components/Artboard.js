/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.oneOfType([
    PropTypes.shape({ ...ViewStylePropTypes }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.shape({ ...ViewStylePropTypes }), PropTypes.number]),
    ),
    PropTypes.number,
  ]),
  name: PropTypes.string,
  children: PropTypes.node,
};

// $FlowFixMe
class Artboard extends React.Component {
  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    return (
      <artboard style={StyleSheet.flatten(this.props.style)} name={this.props.name}>
        {this.props.children}
      </artboard>
    );
  }
}

Artboard.propTypes = propTypes;

module.exports = Artboard;
