// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';

// $FlowFixMe
export default class Defs extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return <svg_defs>{this.props.children}</svg_defs>;
  }
}
