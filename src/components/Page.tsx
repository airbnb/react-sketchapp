import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import { StyleSheet } from '../stylesheet';
import { PageStylePropTypes } from './PageStylePropTypes';

export const PagePropTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  style: or([PropTypes.shape(PageStylePropTypes), PropTypes.number]),
};

type Props = PropTypes.InferProps<typeof PagePropTypes>;

export class Page extends React.Component<Props> {
  static propTypes = PagePropTypes;

  render() {
    const { name, children, style, ...otherProps } = this.props;
    const _name = name === 'Symbols' ? 'Symbols (renamed to avoid conflict)' : name;
    const _style = StyleSheet.flatten(style);

    return (
      <sketch_page name={_name} style={_style} {...otherProps}>
        {children}
      </sketch_page>
    );
  }
}
