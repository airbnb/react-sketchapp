import * as React from 'react';
import * as PropTypes from 'prop-types';

export const DocumentPropTypes = {
  children: PropTypes.node,
};

type Props = PropTypes.InferProps<typeof DocumentPropTypes>;

export class Document extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <sketch_document>{this.props.children}</sketch_document>;
  }
}
