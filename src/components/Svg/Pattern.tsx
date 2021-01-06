import * as React from 'react';
import * as PropTypes from 'prop-types';
import { numberProp } from './props';

const propTypes = {
  x1: numberProp,
  x2: numberProp,
  y1: numberProp,
  y2: numberProp,
  patternTransform: PropTypes.string,
  patternUnits: PropTypes.oneOf(['userSpaceOnUse', 'objectBoundingBox']),
  patternContentUnits: PropTypes.oneOf(['userSpaceOnUse', 'objectBoundingBox']),
  children: PropTypes.node,
};

type Props = PropTypes.InferProps<typeof propTypes>;

export class Pattern extends React.Component<Props> {
  static propTypes = propTypes;

  render() {
    const { children, ...rest } = this.props;
    return <svg_pattern {...rest}>{children}</svg_pattern>;
  }
}
