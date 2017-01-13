/* @flow */
import React, { PropTypes } from 'react';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

// TODO: handle other types, like React Native does
// https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageSourcePropType.js
const ImageSourcePropType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
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
  center: 'Fill', // TODO
  repeat: 'Fill', // TODO
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

    const sketchResizeMode = ResizeModes[resizeMode || (style && style.resizeMode) || 'contain'];

    // TODO: check to see if `source` specifies a width/height as well, and pass into `style` if so

    return (
      <image
        style={style}
        source={source || defaultSource}
        resizeMode={sketchResizeMode}
      >
        { children }
      </image>
    );
  }
}

Image.propTypes = propTypes;

export default Image;
