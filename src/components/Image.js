// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import ResizeModePropTypes from './ResizeModePropTypes';
import ImageStylePropTypes from './ImageStylePropTypes';
import { ViewPropTypes } from './View';

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

const ResizeModes = {
  contain: 'Fit',
  cover: 'Fill',
  stretch: 'Stretch',
  center: 'Fill', // TODO(gold): implement ResizeModes.center
  repeat: 'Tile',
  none: 'Fill',
};

export const ImagePropTypes = {
  ...ViewPropTypes,
  style: or([PropTypes.shape(ImageStylePropTypes), PropTypes.number]),
  defaultSource: ImageSourcePropType,
  resizeMode: ResizeModePropTypes,
  source: ImageSourcePropType,
};

// $FlowFixMe
export default class Image extends React.Component {
  static propTypes = ImagePropTypes;

  static defaultProps = {
    name: 'Image',
  };

  render() {
    const { children, source, defaultSource, resizeMode, name, resizingConstraint } = this.props;

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
