import * as React from 'react';
import { pathProps, numberProp } from './props';
import * as PropTypes from 'prop-types';

const propTypes = {
  ...pathProps,
  cx: numberProp.isRequired,
  cy: numberProp.isRequired,
  rx: numberProp.isRequired,
  ry: numberProp.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Ellipse extends React.Component<Props> {
  static propTypes = propTypes;

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
