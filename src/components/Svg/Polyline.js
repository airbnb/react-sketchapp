// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps } from './props';

// $FlowFixMe
export default class Polyline extends React.Component {
  static propTypes = {
    ...pathProps,
    points: PropTypes.string.isRequired,
  };

  static defaultProps = {
    points: '',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_polyline {...rest}>{children}</svg_polyline>;
  }
}
