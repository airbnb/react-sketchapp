// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { numberProp } from './props';

// $FlowFixMe
export default class Pattern extends React.Component {
  static propTypes = {
    x1: numberProp,
    x2: numberProp,
    y1: numberProp,
    y2: numberProp,
    patternTransform: PropTypes.string,
    patternUnits: PropTypes.oneOf(['userSpaceOnUse', 'objectBoundingBox']),
    patternContentUnits: PropTypes.oneOf(['userSpaceOnUse', 'objectBoundingBox']),
    children: PropTypes.node,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_pattern {...rest}>{children}</svg_pattern>;
  }
}
