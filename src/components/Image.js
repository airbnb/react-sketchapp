/* @flow */
import React, { PropTypes } from 'react';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

// TODO(lmr): handle other types, like React Native does
// https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageSourcePropType.js
const ImageURISourcePropType = PropTypes.shape({
  uri: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
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
  render() {
    const {
      children,
      source,
      defaultSource,
      resizeMode,
    } = this.props;

    const style = StyleSheet.flatten(this.props.style);

    const sketchResizeMode = ResizeModes[resizeMode || (style && style.resizeMode) || 'cover'];

    if (typeof source !== 'string') {
      const { width, height } = source;
      if (width) {
        style.width = width;
      }
      if (height) {
        style.height = height;
      }
    }

    return (
      <image style={style} source={source || defaultSource} resizeMode={sketchResizeMode}>
        {children}
      </image>
    );
  }
}

Image.propTypes = propTypes;

export default Image;
