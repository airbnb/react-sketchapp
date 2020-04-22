import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps, numberProp } from './props';

const propTypes = {
  href: PropTypes.string.isRequired,
  width: numberProp, // Just for reusing `Symbol`
  height: numberProp, //  Just for reusing `Symbol`
  ...pathProps,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const idExpReg = /^#(.+)$/;

export class Use extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    const { href } = this.props;
    // match "url(#pattern)"
    const matched = href.match(idExpReg);

    if (!href || !matched) {
      console.warn(
        `Invalid \`href\` prop for \`Use\` element, expected a href like \`"#id"\`, but got: "${href}"`,
      );
    }
    const { children, ...rest } = this.props;
    return <svg_use {...rest}>{children}</svg_use>;
  }
}
