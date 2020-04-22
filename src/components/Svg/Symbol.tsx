import * as React from 'react';
import * as PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  viewBox: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
  children: PropTypes.node.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Symbol extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    const { children, ...rest } = this.props;

    return <svg_symbol {...rest}>{children}</svg_symbol>;
  }
}
