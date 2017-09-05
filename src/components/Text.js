/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import TextStylePropTypes from './TextStylePropTypes';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.shape({
    ...ViewStylePropTypes,
    ...TextStylePropTypes,
  }),
  name: PropTypes.string,
  resizeConstraints: PropTypes.objectOf(PropTypes.bool),
  children: PropTypes.node,
};

/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */
class Text extends React.Component {
  static defaultProps = {
    name: 'Text',
  };

  render() {
    return (
      <text
        name={this.props.name}
        style={StyleSheet.flatten(this.props.style)}
        resizeConstraints={this.props.resizeConstraints}
      >
        {this.props.children}
      </text>
    );
  }
}

Text.propTypes = propTypes;

module.exports = Text;
