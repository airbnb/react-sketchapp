import React from 'react';
import PropTypes from 'prop-types';
import { textProps } from './props';

module.exports = class TSpan extends React.Component {
  static propTypes = textProps;

  static childContextTypes = {
    isInAParentText: PropTypes.bool,
  };

  getChildContext() {
    return {
      isInAParentText: true,
    };
  }

  getContextTypes() {
    return {
      isInAParentText: PropTypes.bool,
    };
  }

  render() {
    const { children, ...rest } = this.props;
    return <svg_tspan {...rest}>{children}</svg_tspan>;
  }
};
