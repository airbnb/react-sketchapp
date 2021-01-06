import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ImageSourcePropType } from '../Image';
import { numberProp } from './props';

const propTypes = {
  x: numberProp,
  y: numberProp,
  width: numberProp.isRequired,
  height: numberProp.isRequired,
  href: ImageSourcePropType,
  preserveAspectRatio: PropTypes.string,
  children: PropTypes.node,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class SVGImage extends React.Component<Props> {
  static propTypes = propTypes;

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
