// @flow
import * as React from 'react';
import { pathProps, numberProp } from './props';

// $FlowFixMe
export default class Circle extends React.Component {
  static propTypes = {
    ...pathProps,
    cx: numberProp.isRequired,
    cy: numberProp.isRequired,
    r: numberProp.isRequired,
  };

  static defaultProps = {
    cx: 0,
    cy: 0,
    r: 0,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_circle {...rest}>{children}</svg_circle>;
  }
}
