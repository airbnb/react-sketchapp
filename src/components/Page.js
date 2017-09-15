/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import buildTree from '../buildTree';
import { renderToSketch } from '../render';

const propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

// Keep track of how mayn pages have been rendered
let pageTotal = 0;

class Page extends React.Component {
  static defaultProps = {
    name: 'Page 1',
  };

  createPage() {
    const { name, children } = this.props;

    // Get Document
    const document = this.context.sketchContext.document;
    let page = document.currentPage();

    if (pageTotal > 0) {
      // Create new page
      page = document.addBlankPage();
    } else {
      pageTotal += 1;
    }

    if (name) {
      // Name new page
      page.setName(name);
    }

    return renderToSketch(buildTree(children), page);
  }

  render() {
    const { name, children } = this.props;

    this.createPage();

    return (
      <page name={name} sketchContext={this.context.sketchContext}>
        {children}
      </page>
    );
  }
}

Page.propTypes = propTypes;

Page.contextTypes = {
  sketchContext: PropTypes.object,
};

module.exports = Page;
