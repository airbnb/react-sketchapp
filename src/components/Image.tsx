import * as React from 'react';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import { StyleSheet } from '../stylesheet';
import { ResizeModePropTypes } from './ResizeModePropTypes';
import { ImageStylePropTypes } from './ImageStylePropTypes';
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

const ResizeModes: { [key: string]: FileFormat.PatternFillType } = {
  contain: 3,
  cover: 1,
  stretch: 2,
  center: 1, // TODO(gold): implement ResizeModes.center
  repeat: 0,
  none: 1,
};

export const ImagePropTypes = {
  ...ViewPropTypes,
  style: or([PropTypes.shape(ImageStylePropTypes), PropTypes.number]),
  defaultSource: ImageSourcePropType,
  resizeMode: ResizeModePropTypes,
  source: ImageSourcePropType,
};

export type Props = PropTypes.InferProps<typeof ImagePropTypes>;

export class Image extends React.Component<Props> {
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
      <sketch_image
        style={style}
        source={source || defaultSource}
        name={name}
        resizeMode={sketchResizeMode}
        resizingConstraint={resizingConstraint}
      >
        {children}
      </sketch_image>
    );
  }
}
