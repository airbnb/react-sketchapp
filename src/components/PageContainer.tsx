import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import PageStylePropTypes from './PageStylePropTypes';

export const PagePropTypes = {
  children: PropTypes.node,
  style: or([PropTypes.shape(PageStylePropTypes), PropTypes.number]),
};

type Props = PropTypes.InferProps<typeof PagePropTypes>;

export default class PageContainer extends React.Component<Props> {
  static propTypes = PagePropTypes;

  render() {
    const { children, style, ...otherProps } = this.props;
    const _style = StyleSheet.flatten(style);

    return (
      <sketch_pagecontainer style={_style} {...otherProps}>
        {children}
      </sketch_pagecontainer>
    );
  }
}
