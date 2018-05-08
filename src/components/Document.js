/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

// $FlowFixMe
class Document extends React.Component {
  render() {
    return <document>{this.props.children}</document>;
  }
}

Document.propTypes = propTypes;

module.exports = Document;
