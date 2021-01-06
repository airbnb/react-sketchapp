import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps } from './props';

const propTypes = {
  ...pathProps,
  points: PropTypes.string.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Polygon extends React.Component<Props> {
  static displayName = 'Polygon';

  static propTypes = propTypes;

  static defaultProps = {
    points: '',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_polygon {...rest}>{children}</svg_polygon>;
  }
}
