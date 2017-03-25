/* @flow */
import React, { PropTypes } from 'react';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

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

const ImageSourcePropType = PropTypes.oneOfType([
  ImageURISourcePropType,
  // PropTypes.arrayOf(ImageURISourcePropType), // TODO: handle me
  PropTypes.string,
]);

const ResizeModePropType = PropTypes.oneOf([
  'contain',
  'cover',
  'stretch',
  'center',
  'repeat',
  'none',
]);

const propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
  defaultSource: ImageSourcePropType,
  resizeMode: ResizeModePropType,
  source: ImageSourcePropType,
  style: PropTypes.shape({
    ...ViewStylePropTypes,
    resizeMode: ResizeModePropType,
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

class Image extends React.Component {
  static defaultProps = {
    name: 'Image',
  };

  render() {
    const {
      children,
      source,
      defaultSource,
      resizeMode,
      name,
    } = this.props;

    const style = StyleSheet.flatten(this.props.style);

    const sketchResizeMode = ResizeModes[resizeMode || (style && style.resizeMode) || 'cover'];
    if (source && typeof source !== 'string') {
      const { width, height } = source;
      if (width) {
        style.width = width;
      }
      if (height) {
        style.height = height;
      }
    }

    return (
      <image
        style={style}
        source={source || defaultSource}
        name={name}
        resizeMode={sketchResizeMode}
      >
        {children}
      </image>
    );
  }
}

Image.propTypes = propTypes;

export default Image;
