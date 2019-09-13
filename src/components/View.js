// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';
import ResizingConstraintPropTypes from './ResizingConstraintPropTypes';
import ShadowsPropTypes from './ShadowsPropTypes';
import BorderPositionTypePropTypes from './BorderPositionTypePropTypes';

export const ViewPropTypes = {
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
  borderPositionType: BorderPositionTypePropTypes,
  children: PropTypes.node,
};

// $FlowFixMe
export default class View extends React.Component {
  static propTypes = ViewPropTypes;

  static defaultProps = {
    name: 'View',
    borderPositionType: 'Outside',
  };

  render() {
    return (
      <view
        name={this.props.name}
        style={StyleSheet.flatten(this.props.style)}
        resizingConstraint={this.props.resizingConstraint}
        shadows={this.props.shadows}
        borderPositionType={this.props.borderPositionType}
      >
        {this.props.children}
      </view>
    );
  }
}
