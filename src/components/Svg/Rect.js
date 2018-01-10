import React from 'react';
import { pathProps, numberProp } from './props';

module.exports = class Rect extends React.Component {
  static propTypes = {
    ...pathProps,
    x: numberProp.isRequired,
    y: numberProp.isRequired,
    width: numberProp.isRequired,
    height: numberProp.isRequired,
    rx: numberProp,
    ry: numberProp,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rx: 0,
    ry: 0,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_rect {...rest}>{children}</svg_rect>;
  }
};
