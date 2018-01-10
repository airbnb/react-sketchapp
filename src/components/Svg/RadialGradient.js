import React from 'react';
import PropTypes from 'prop-types';
import { numberProp } from './props';

// eslint is broken doesn't like when we just check the props without "using" them
/* eslint-disable react/no-unused-prop-types */
module.exports = class RadialGradient extends React.Component {
  static propTypes = {
    fx: numberProp.isRequired,
    fy: numberProp.isRequired,
    rx: numberProp,
    ry: numberProp,
    cx: numberProp.isRequired,
    cy: numberProp.isRequired,
    r: numberProp,
    gradientUnits: PropTypes.oneOf(['objectBoundingBox', 'userSpaceOnUse']),
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    fx: '50%',
    fy: '50%',
    cx: '50%',
    cy: '50%',
    r: '50%',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_radialGradient {...rest}>{children}</svg_radialGradient>;
  }
};
