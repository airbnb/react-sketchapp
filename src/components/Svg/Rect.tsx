import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps, numberProp } from './props';

const propTypes = {
  ...pathProps,
  x: numberProp.isRequired,
  y: numberProp.isRequired,
  width: numberProp.isRequired,
  height: numberProp.isRequired,
  rx: numberProp,
  ry: numberProp,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Rect extends React.Component<Props> {
  static propTypes = propTypes;

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
}
