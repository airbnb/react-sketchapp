// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';
import ResizingConstraintPropTypes from './ResizingConstraintPropTypes';
import ShadowsPropTypes from './ShadowsPropTypes';

// $FlowFixMe
export default class View extends React.Component {
  static propTypes = {
    // TODO(lmr): do some nice warning stuff like RN does
    style: or([PropTypes.shape(ViewStylePropTypes), PropTypes.number]),
    name: PropTypes.string,
    resizingConstraint: PropTypes.shape({
      ...ResizingConstraintPropTypes,
    }),
    shadows: PropTypes.arrayOf(
      PropTypes.shape({
        ...ShadowsPropTypes,
      }),
    ),
    children: PropTypes.node,
  };

  static defaultProps = {
    name: 'View',
  };

  render() {
    return (
      <view
        name={this.props.name}
        style={StyleSheet.flatten(this.props.style)}
        resizingConstraint={this.props.resizingConstraint}
        shadows={this.props.shadows}
      >
        {this.props.children}
      </view>
    );
  }
}
