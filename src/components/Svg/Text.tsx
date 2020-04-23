import * as React from 'react';
import * as PropTypes from 'prop-types';
import { textProps } from './props';

type Props = PropTypes.InferProps<typeof textProps>;

export class Text extends React.Component<Props> {
  static propTypes = textProps;

  static childContextTypes = {
    isInAParentText: PropTypes.bool,
  };

  getChildContext() {
    return {
      isInAParentText: true,
    };
  }

  getContextTypes() {
    return {
      isInAParentText: PropTypes.bool,
    };
  }

  render() {
    const { children, ...rest } = this.props;
    return <svg_text {...rest}>{children}</svg_text>;
  }
}
