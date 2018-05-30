// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';
import ResizingConstraintPropTypes from './ResizingConstraintPropTypes';

// $FlowFixMe
export default class View extends React.Component {
  static propTypes = {
    // TODO(lmr): do some nice warning stuff like RN does
    style: PropTypes.oneOfType([
      PropTypes.shape({ ...ViewStylePropTypes }),
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.shape({ ...ViewStylePropTypes }), PropTypes.number]),
      ),
      PropTypes.number,
    ]),
    name: PropTypes.string,
    resizingConstraint: PropTypes.shape({
      ...ResizingConstraintPropTypes,
    }),
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
      >
        {this.props.children}
      </view>
    );
  }
}
