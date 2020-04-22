import * as React from 'react';
import * as PropTypes from 'prop-types';
import { numberProp } from './props';

const propTypes = {
  stopColor: PropTypes.string,
  stopOpacity: numberProp,
  children: PropTypes.node,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Stop extends React.Component<Props> {
  static propTypes = propTypes;

  static defaultProps = {
    stopColor: '#000',
    stopOpacity: 1,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_stop {...rest}>{children}</svg_stop>;
  }
}
