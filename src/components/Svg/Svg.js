import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';

module.exports = class Svg extends React.Component {
  static displayName = 'Svg';
  static propTypes = {
    ...View.propTypes,
    opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // more detail https://svgwg.org/svg2-draft/coords.html#ViewBoxAttribute
    viewBox: PropTypes.string,
    preserveAspectRatio: PropTypes.string,
  };

  static defaultProps = {
    preserveAspectRatio: 'xMidYMid meet',
  };

  render() {
    const { children, ...rest } = this.props;

    return <svg {...rest}>{children}</svg>;
  }
};
