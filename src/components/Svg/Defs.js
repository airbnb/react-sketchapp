import React from 'react';
import PropTypes from 'prop-types';

module.exports = class Defs extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return <svg_defs>{this.props.children}</svg_defs>;
  }
};
