/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

class Page extends React.Component {
  static defaultProps = {
    name: 'Page 1',
  };

  render() {
    const { name, children } = this.props;
    const _name =
      name === 'Symbols' ? 'Symbols (renamed to avoid conflict)' : name;

    return <page name={_name}>{children}</page>;
  }
}

Page.propTypes = propTypes;

module.exports = Page;
