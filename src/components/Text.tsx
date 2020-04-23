import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import { StyleSheet } from '../stylesheet';
import { TextStylePropTypes } from './TextStylePropTypes';
import { ViewPropTypes } from './View';

export const TextPropTypes = {
  ...ViewPropTypes,
  style: or([PropTypes.shape(TextStylePropTypes), PropTypes.number]),
};

export type Props = PropTypes.InferProps<typeof TextPropTypes>;

/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */
export class Text extends React.Component<Props> {
  static propTypes = TextPropTypes;

  render() {
    return (
      <sketch_text
        name={this.props.name}
        style={StyleSheet.flatten(this.props.style)}
        resizingConstraint={this.props.resizingConstraint}
      >
        {this.props.children}
      </sketch_text>
    );
  }
}
