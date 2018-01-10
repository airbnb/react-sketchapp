import React from 'react';
import PropTypes from 'prop-types';
import { numberProp } from './props';

// eslint is broken doesn't like when we just check the props without "using" them
/* eslint-disable react/no-unused-prop-types */
module.exports = class Stop extends React.Component {
  static propTypes = {
    stopColor: PropTypes.string,
    stopOpacity: numberProp,
    children: PropTypes.node,
  };

  static defaultProps = {
    stopColor: '#000',
    stopOpacity: 1,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_stop {...rest}>{children}</svg_stop>;
  }
};
