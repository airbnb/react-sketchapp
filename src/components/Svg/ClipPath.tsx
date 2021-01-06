import * as React from 'react';
import * as PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class ClipPath extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    return <svg_clipPath id={this.props.id}>{this.props.children}</svg_clipPath>;
  }
}
