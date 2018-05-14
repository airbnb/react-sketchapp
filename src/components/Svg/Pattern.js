import React from 'react';
import PropTypes from 'prop-types';
import { numberProp } from './props';

// eslint is broken doesn't like when we just check the props without "using" them
/* eslint-disable react/no-unused-prop-types */
module.exports = class Pattern extends React.Component {
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
};
