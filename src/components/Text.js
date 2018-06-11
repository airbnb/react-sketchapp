// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import TextStylePropTypes from './TextStylePropTypes';
import ViewStylePropTypes from './ViewStylePropTypes';
import ResizingConstraintPropTypes from './ResizingConstraintPropTypes';

/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */
// $FlowFixMe
export default class Text extends React.Component {
  static propTypes = {
    // TODO(lmr): do some nice warning stuff like RN does
    style: or([
      PropTypes.shape({ ...ViewStylePropTypes, ...TextStylePropTypes }),
      PropTypes.number,
    ]),
    name: PropTypes.string,
    resizingConstraint: PropTypes.shape({
      ...ResizingConstraintPropTypes,
    }),
    children: PropTypes.node,
  };

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
