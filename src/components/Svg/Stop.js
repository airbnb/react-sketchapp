// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { numberProp } from './props';

// $FlowFixMe
export default class Stop extends React.Component {
  static propTypes = {
    stopColor: PropTypes.string,
    stopOpacity: numberProp,
    children: PropTypes.node,
  };

  static defaultProps = {
    stopColor: '#000',
    stopOpacity: 1,
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_stop {...rest}>{children}</svg_stop>;
  }
}
