import React from 'react';
import PropTypes from 'prop-types';
import { pathProps } from './props';

module.exports = class Polyline extends React.Component {
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
};
