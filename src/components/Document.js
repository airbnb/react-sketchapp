/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  context: PropTypes.object,
  children: PropTypes.node,
};

class Document extends React.Component {
  static defaultProps = {
    name: 'Document',
  };

  render() {
    const { context, children } = this.props;

    return <document context={context}>{children}</document>;
  }
}

Document.propTypes = propTypes;

module.exports = Document;
