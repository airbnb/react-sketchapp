import * as React from 'react';
import { pathProps, fontProps } from './props';
import * as PropTypes from 'prop-types';

const propTypes = {
  ...pathProps,
  ...fontProps,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class G extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    const { children, ...rest } = this.props;

    return <svg_g {...rest}>{children}</svg_g>;
  }
}
