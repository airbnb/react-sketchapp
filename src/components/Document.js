// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';

// $FlowFixMe
export default class Document extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <document>{this.props.children}</document>;
  }
}
