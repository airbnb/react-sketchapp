// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pathProps, numberProp } from './props';

const idExpReg = /^#(.+)$/;

// $FlowFixMe
export default class Use extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    width: numberProp, // Just for reusing `Symbol`
    height: numberProp, //  Just for reusing `Symbol`
    ...pathProps,
  };

  render() {
    const { href } = this.props;
    // match "url(#pattern)"
    const matched = href.match(idExpReg);

    if (!href || !matched) {
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid \`href\` prop for \`Use\` element, expected a href like \`"#id"\`, but got: "${href}"`,
      );
    }
    const { children, ...rest } = this.props;
    return <svg_use {...rest}>{children}</svg_use>;
  }
}
