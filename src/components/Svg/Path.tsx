import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps } from './props';

const propTypes = {
  ...pathProps,
  d: PropTypes.string.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Path extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    const { children, ...rest } = this.props;
    return <svg_path {...rest}>{children}</svg_path>;
  }
}
