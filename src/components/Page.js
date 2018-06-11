// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import PageStylePropTypes from './PageStylePropTypes';

// $FlowFixMe
export default class Page extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    style: or([PropTypes.shape(PageStylePropTypes), PropTypes.number]),
  };

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
