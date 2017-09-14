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

  resetPages(context: Object) {
    // Get Document
    const document = context.document;

    // Get Pages and delete them all
    const pages = context.document.pages();
    for (let index = pages.length; index >= 0; index -= 1) {
      if (pages.length > 1) {
        document.documentData().removePageAtIndex(index);
      } else {
        // Can't delete the last page. Remove all layers instead
        const layers = pages[index].children();
        for (let l = 0; l < layers.count(); l += 1) {
          const layer = layers.objectAtIndex(l);
          layer.removeFromParent();
        }
      }
    }
  }

  render() {
    const { context, children } = this.props;

    // TODO: Display error if context is not used
    if (context) {
      this.resetPages(context);
    } else {
      // eslint-disable-next-line
      console.error("`context` prop missing from <Document /> component.");
    }

    return <document>{children}</document>;
  }
}

Document.propTypes = propTypes;

module.exports = Document;
