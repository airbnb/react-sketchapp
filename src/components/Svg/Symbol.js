// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';

// $FlowFixMe
export default class Symbol extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    viewBox: PropTypes.string,
    preserveAspectRatio: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return <svg_symbol {...rest}>{children}</svg_symbol>;
  }
}
