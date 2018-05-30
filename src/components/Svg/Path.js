// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps } from './props';

// $FlowFixMe
export default class Path extends React.Component {
  static propTypes = {
    ...pathProps,
    d: PropTypes.string.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_path {...rest}>{children}</svg_path>;
  }
}
