/* @flow */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import TextStylePropTypes from './TextStylePropTypes';
import ViewStylePropTypes from './ViewStylePropTypes';

const propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: PropTypes.shape({
    ...ViewStylePropTypes,
    ...TextStylePropTypes,
  }),
  name: PropTypes.string,
  children: PropTypes.node,
};

/**
 * @example
 * <Svg name='Foo' style={style}>
 *   <Svg.Text>Hello World!</Svg.Text>
 * </Svg>
 */
class Svg extends React.Component {
  static defaultProps = {
    name: 'Shape',
  };

  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg>
    );
  }
}

Svg.propTypes = propTypes;

class Circle extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_circle style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_circle>
    );
  }
}

Circle.propTypes = propTypes;

class Ellipse extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_ellipse style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_ellipse>
    );
  }
}

Ellipse.propTypes = propTypes;

class G extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_g style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_g>
    );
  }
}

G.propTypes = propTypes;

class LinearGradient extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_linearGradient style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_linearGradient>
    );
  }
}

LinearGradient.propTypes = propTypes;

class RadialGradient extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_radialGradient style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_radialGradient>
    );
  }
}

RadialGradient.propTypes = propTypes;

class Line extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_line style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_line>
    );
  }
}

Line.propTypes = propTypes;

class Path extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_path style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_path>
    );
  }
}

Path.propTypes = propTypes;

class Polygon extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_polygon style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_polygon>
    );
  }
}

Polygon.propTypes = propTypes;

class Polyline extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_polyline style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_polyline>
    );
  }
}

Polyline.propTypes = propTypes;

class Rect extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_rect style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_rect>
    );
  }
}

Rect.propTypes = propTypes;

class Symbol extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_symbol style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_symbol>
    );
  }
}

Symbol.propTypes = propTypes;

class Text extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_text style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_text>
    );
  }
}

Text.propTypes = propTypes;

class Use extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_use style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_use>
    );
  }
}

Use.propTypes = propTypes;

class Defs extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_defs style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_defs>
    );
  }
}

Defs.propTypes = propTypes;

class Stop extends React.Component {
  render() {
    const { style, children, ...rest } = this.props;
    return (
      <svg_stop style={StyleSheet.flatten(style)} {...rest}>
        {children}
      </svg_stop>
    );
  }
}

Stop.propTypes = propTypes;

module.exports = Svg;

module.exports.Svg = Svg;
module.exports.Circle = Circle;
module.exports.Ellipse = Ellipse;
module.exports.G = G;
module.exports.LinearGradient = LinearGradient;
module.exports.RadialGradient = RadialGradient;
module.exports.Line = Line;
module.exports.Path = Path;
module.exports.Polygon = Polygon;
module.exports.Polyline = Polyline;
module.exports.Rect = Rect;
module.exports.Symbol = Symbol;
module.exports.Text = Text;
module.exports.Use = Use;
module.exports.Defs = Defs;
module.exports.Stop = Stop;
