/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import CanvasStylePropTypes from './CanvasStylePropTypes';

const propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.shape({ ...CanvasStylePropTypes }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({ ...CanvasStylePropTypes }),
        PropTypes.number,
      ])
    ),
    PropTypes.number,
  ]),
};

class Canvas extends React.Component {
  render() {
    const { children, style, ...otherProps } = this.props;
    const _style = StyleSheet.flatten(style);

    return (
      <canvas style={_style} {...otherProps}>
        {children}
      </canvas>
    );
  }
}

Canvas.propTypes = propTypes;

module.exports = Canvas;
