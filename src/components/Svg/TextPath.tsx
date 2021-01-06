import * as React from 'react';
import * as PropTypes from 'prop-types';
import { textPathProps } from './props';

type Props = PropTypes.InferProps<typeof textPathProps>;

const idExpReg = /^#(.+)$/;

export class TextPath extends React.Component<Props> {
  static propTypes = textPathProps;

  render() {
    if (!this.props.href || !this.props.href.match(idExpReg)) {
      console.warn(
        `Invalid \`href\` prop for \`TextPath\` element, expected a href like \`"#id"\`, but got: "${this.props.href}"`,
      );
    }

    const { children, ...rest } = this.props;

    return <svg_textPath {...rest}>{children}</svg_textPath>;
  }
}
