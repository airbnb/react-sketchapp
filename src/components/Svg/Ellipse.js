// @flow
import * as React from 'react';
import { pathProps, numberProp } from './props';

// $FlowFixMe
export default class Ellipse extends React.Component {
  static propTypes = {
    ...pathProps,
    cx: numberProp.isRequired,
    cy: numberProp.isRequired,
    rx: numberProp.isRequired,
    ry: numberProp.isRequired,
  };

  static defaultProps = {
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_ellipse {...rest}>{children}</svg_ellipse>;
  }
}
