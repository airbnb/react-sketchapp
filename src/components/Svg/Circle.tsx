import * as React from 'react';
import { pathProps, numberProp } from './props';
import * as PropTypes from 'prop-types';

const propTypes = {
  ...pathProps,
  cx: numberProp.isRequired,
  cy: numberProp.isRequired,
  r: numberProp.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Circle extends React.Component<Props> {
  static propTypes = propTypes;

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
