import * as React from 'react';
import { pathProps, numberProp } from './props';
import * as PropTypes from 'prop-types';

const propTypes = {
  ...pathProps,
  x1: numberProp.isRequired,
  x2: numberProp.isRequired,
  y1: numberProp.isRequired,
  y2: numberProp.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Line extends React.Component<Props> {
  static propTypes = propTypes;

  static defaultProps = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_line {...rest}>{children}</svg_line>;
  }
}
