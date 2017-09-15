/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  sketchContext: PropTypes.object,
  children: PropTypes.node,
};

class Document extends React.Component {
  static defaultProps = {
    name: 'Document',
  };

  getChildContext() {
    return { sketchContext: this.props.sketchContext };
  }

  // Clear out sketch document, so we have a clean slate to re-render
  resetPages() {
    const { sketchContext } = this.props;

    // Get Document
    const document = sketchContext.document;

    // Get Pages and delete them all
    const pages = sketchContext.document.pages();
    for (let index = pages.length - 1; index >= 0; index -= 1) {
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
    const { sketchContext } = this.props;

    if (!sketchContext) {
      throw new Error(
        `
       Error building sketch file.
       'sketchContext' prop was not provided to the <Document> component.
       Try the following: <Document sketchContext={context}>
      `
      );
    }

    this.resetPages();

    return (
      <document sketchContext={sketchContext}>{this.props.children}</document>
    );
  }
}

Document.propTypes = propTypes;

Document.childContextTypes = {
  sketchContext: PropTypes.object,
};

module.exports = Document;
