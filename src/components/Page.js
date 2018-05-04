/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import PageStylePropTypes from './PageStylePropTypes';

const propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.shape({ ...PageStylePropTypes }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.shape({ ...PageStylePropTypes }), PropTypes.number]),
    ),
    PropTypes.number,
  ]),
};

// $FlowFixMe
class Page extends React.Component {
  render() {
    const {
      name, children, style, ...otherProps
    } = this.props;
    const _name = name === 'Symbols' ? 'Symbols (renamed to avoid conflict)' : name;
    const _style = StyleSheet.flatten(style);

    return (
      <page name={_name} style={_style} {...otherProps}>
        {children}
      </page>
    );
  }
}

Page.propTypes = propTypes;

module.exports = Page;
