// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { numberProp } from './props';

// $FlowFixMe
export default class LinearGradient extends React.Component {
  static propTypes = {
    x1: numberProp.isRequired,
    x2: numberProp.isRequired,
    y1: numberProp.isRequired,
    y2: numberProp.isRequired,
    gradientUnits: PropTypes.oneOf(['objectBoundingBox', 'userSpaceOnUse']),
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_linearGradient {...rest}>{children}</svg_linearGradient>;
  }
}
