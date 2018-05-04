/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../stylesheet';
import ResizingConstraintPropTypes from './ResizingConstraintPropTypes';
import ResizeModePropTypes from './ResizeModePropTypes';
import ImageStylePropTypes from './ImageStylePropTypes';

const ImageURISourcePropType = PropTypes.shape({
  uri: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  // bundle: PropTypes.string,
  // method: PropTypes.string,
  // headers: PropTypes.objectOf(PropTypes.string),
  // body: PropTypes.string,
  // cache: PropTypes.oneOf(['default', 'reload', 'force-cache', 'only-if-cached']),
  // scale: PropTypes.number,
});

export const ImageSourcePropType = PropTypes.oneOfType([
  ImageURISourcePropType,
  // PropTypes.arrayOf(ImageURISourcePropType), // TODO: handle me
  PropTypes.string,
]);

const propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  defaultSource: ImageSourcePropType,
  resizeMode: ResizeModePropTypes,
  source: ImageSourcePropType,
  style: PropTypes.oneOfType([
    PropTypes.shape(ImageStylePropTypes),
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.shape(ImageStylePropTypes), PropTypes.number]),
    ),
    PropTypes.number,
  ]),
  resizingConstraint: PropTypes.shape({
    ...ResizingConstraintPropTypes,
  }),
};

const ResizeModes = {
  contain: 'Fit',
  cover: 'Fill',
  stretch: 'Stretch',
  center: 'Fill', // TODO(gold): implement ResizeModes.center
  repeat: 'Tile',
  none: 'Fill',
};

// $FlowFixMe
class Image extends React.Component {
  static defaultProps = {
    name: 'Image',
  };

  render() {
    const {
      children, source, defaultSource, resizeMode, name, resizingConstraint,
    } = this.props;

    let style = StyleSheet.flatten(this.props.style) || {};

    const sketchResizeMode = ResizeModes[resizeMode || (style && style.resizeMode) || 'cover'];
    if (source && typeof source !== 'string') {
      style = {
        height: source.height,
        width: source.width,
        ...style,
      };
    }

    return (
      <image
        style={style}
        source={source || defaultSource}
        name={name}
        resizeMode={sketchResizeMode}
        resizingConstraint={resizingConstraint}
      >
        {children}
      </image>
    );
  }
}

Image.propTypes = propTypes;

export default Image;
