// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ImageSourcePropType } from '../Image';
import { numberProp } from './props';

// $FlowFixMe
export default class SVGImage extends React.Component {
  static propTypes = {
    x: numberProp,
    y: numberProp,
    width: numberProp.isRequired,
    height: numberProp.isRequired,
    href: ImageSourcePropType,
    preserveAspectRatio: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    preserveAspectRatio: 'xMidYMid meet',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_image {...rest}>{children}</svg_image>;
  }
}
