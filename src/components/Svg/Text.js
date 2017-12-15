import React from 'react';
import PropTypes from 'prop-types';
import { textProps } from './props';

module.exports = class Text extends React.Component {
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
    return <svg_text {...rest}>{children}</svg_text>;
  }
};
