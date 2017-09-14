/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  context: PropTypes.object,
  children: PropTypes.node,
};

class Page extends React.Component {
  static defaultProps = {
    name: 'Page 1',
  };

  render() {
    const { name, context, children } = this.props;

    return (
      <page name={name} context={context}>
        {children}
      </page>
    );
  }
}

Page.propTypes = propTypes;

module.exports = Page;
