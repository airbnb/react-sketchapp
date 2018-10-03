// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import TextStylePropTypes from './TextStylePropTypes';
import { ViewPropTypes } from './View';

export const TextPropTypes = {
  ...ViewPropTypes,
  style: or([PropTypes.shape(TextStylePropTypes), PropTypes.number]),
};

/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */
// $FlowFixMe
export default class Text extends React.Component {
  static propTypes = TextPropTypes;

  render() {
    return (
      <text
        name={this.props.name}
        style={StyleSheet.flatten(this.props.style)}
        resizingConstraint={this.props.resizingConstraint}
      >
        {this.props.children}
      </text>
    );
  }
}
