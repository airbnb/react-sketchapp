// @flow
import * as React from 'react';
import { textPathProps } from './props';

const idExpReg = /^#(.+)$/;

// $FlowFixMe
export default class TextPath extends React.Component {
  static propTypes = textPathProps;

  render() {
    if (!this.props.href || !this.props.href.match(idExpReg)) {
      console.warn(
        `Invalid \`href\` prop for \`TextPath\` element, expected a href like \`"#id"\`, but got: "${
          this.props.href
        }"`,
      );
    }

    const { children, ...rest } = this.props;

    return <svg_textPath {...rest}>{children}</svg_textPath>;
  }
}
