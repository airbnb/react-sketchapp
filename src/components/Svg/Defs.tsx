import * as React from 'react';
import * as PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Defs extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    return <svg_defs>{this.props.children}</svg_defs>;
  }
}
