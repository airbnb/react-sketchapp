import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ViewPropTypes } from '../View';
import { StyleSheet } from '../../stylesheet';
import { Circle } from './Circle';
import { ClipPath } from './ClipPath';
import { Defs } from './Defs';
import { Ellipse } from './Ellipse';
import { G } from './G';
import { SVGImage as Image } from './Image';
import { Line } from './Line';
import { LinearGradient } from './LinearGradient';
import { Path } from './Path';
import { Pattern } from './Pattern';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
import { RadialGradient } from './RadialGradient';
import { Rect } from './Rect';
import { Stop } from './Stop';
import { Symbol } from './Symbol';
import { Text } from './Text';
import { TextPath } from './TextPath';
import { TSpan } from './TSpan';
import { Use } from './Use';

const propTypes = {
  ...ViewPropTypes,
  opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // more detail https://svgwg.org/svg2-draft/coords.html#ViewBoxAttribute
  viewBox: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
  xmlns: PropTypes.string,
  'xmlns:xlink': PropTypes.string,
};

export type Props = PropTypes.InferProps<typeof propTypes>;

export class Svg extends React.Component<Props> {
  static displayName = 'Svg';

  static propTypes = propTypes;

  static defaultProps = {
    preserveAspectRatio: 'xMidYMid meet',
  };

  static Circle = Circle;

  static ClipPath = ClipPath;

  static Defs = Defs;

  static Ellipse = Ellipse;

  static G = G;

  static Image = Image;

  static Line = Line;

  static LinearGradient = LinearGradient;

  static Path = Path;

  static Pattern = Pattern;

  static Polygon = Polygon;

  static Polyline = Polyline;

  static RadialGradient = RadialGradient;

  static Rect = Rect;

  static Stop = Stop;

  static Symbol = Symbol;

  static Text = Text;

  static TextPath = TextPath;

  static TSpan = TSpan;

  static Use = Use;

  render() {
    const { children, style, ...rest } = this.props;

    return (
      <sketch_svg {...rest} style={StyleSheet.flatten(style)}>
        {children}
      </sketch_svg>
    );
  }
}
