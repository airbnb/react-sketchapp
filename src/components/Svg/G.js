import React from 'react';
import { pathProps, fontProps } from './props';

export default class G extends React.Component {
  static propTypes = {
    ...pathProps,
    ...fontProps,
  };

  render() {
    const { children, ...rest } = this.props;

    return <svg_g {...rest}>{children}</svg_g>;
  }
}
