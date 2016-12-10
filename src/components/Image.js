/* @flow */
import React, { PropTypes } from 'react';
import { dissoc } from 'ramda';
import StyleSheet from '../stylesheet';
import View from './View';
import ViewStylePropTypes from './ViewStylePropTypes';

const ImageSourcePropType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  PropTypes.string,
]);

const propTypes = {
  children: PropTypes.any,
  defaultSource: ImageSourcePropType,
  resizeMode: PropTypes.oneOf(['contain', 'cover', 'none', 'stretch']),
  source: ImageSourcePropType,
  style: PropTypes.shape({
    ...ViewStylePropTypes,
  }),
};

const ResizeModes = {
  contain: 'Fit',
  cover: 'Fill',
  stretch: 'Stretch',
  // none: 'Fill',
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

    const sketchResizeMode = ResizeModes[resizeMode || style.resizeMode];

    return (
      <View>
        <image
          style={dissoc('resizeMode', style)}
          source={source || defaultSource}
          resizeMode={sketchResizeMode}
        />
        { children &&
          <View>
            { children }
          </View>
        }
      </View>
    );
  }
}

Image.propTypes = propTypes;

export default Image;
