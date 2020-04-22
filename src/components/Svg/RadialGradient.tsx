import * as React from 'react';
import * as PropTypes from 'prop-types';
import { numberProp } from './props';

const propTypes = {
  fx: numberProp.isRequired,
  fy: numberProp.isRequired,
  rx: numberProp,
  ry: numberProp,
  cx: numberProp.isRequired,
  cy: numberProp.isRequired,
  r: numberProp,
  gradientUnits: PropTypes.oneOf(['objectBoundingBox', 'userSpaceOnUse']),
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class RadialGradient extends React.Component<Props> {
  static propTypes = propTypes;

  static defaultProps = {
    fx: '50%',
    fy: '50%',
    cx: '50%',
    cy: '50%',
    r: '50%',
  };

  render() {
    const { children, ...rest } = this.props;
    return <svg_radialGradient {...rest}>{children}</svg_radialGradient>;
  }
}
