// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps } from './props';

// $FlowFixMe
export default class Polygon extends React.Component {
  static displayName = 'Polygon';
  static propTypes = {
    ...pathProps,
    points: PropTypes.string.isRequired,
  };

  static defaultProps = {
    points: '',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_polygon {...rest}>{children}</svg_polygon>;
  }
}
