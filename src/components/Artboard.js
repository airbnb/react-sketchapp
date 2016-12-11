/* @flow */
import React, { PropTypes } from 'react';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.shape({
    ...ViewStylePropTypes,
  }),
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

/**
 * A wrapper for Sketch Artboards. Not exposed in `react-primitives`!
 * @example
 * <Artboard name='Foo' style={style}>
 *   // children
 * </Artboard>
 */
class Artboard extends React.Component {
  render() {
    return (
      <artboard
        style={StyleSheet.flatten(this.props.style)}
        name={this.props.name}
      >
        {this.props.children}
      </artboard>
    );
  }
}

Artboard.propTypes = propTypes;

module.exports = Artboard;
