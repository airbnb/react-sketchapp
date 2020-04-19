import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';
import { UserStyles } from '../stylesheet/types';
import { ArtboardProvider } from '../context';

const ViewportPropTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const ArtboardPropTypes = {
  style: or([PropTypes.shape(ViewStylePropTypes), PropTypes.number]),
  name: PropTypes.string,
  isHome: PropTypes.bool,
  children: PropTypes.node,
  viewport: PropTypes.shape(ViewportPropTypes),
};

export type Props = PropTypes.InferProps<typeof ArtboardPropTypes>;

export default class Artboard extends React.Component<Props> {
  static propTypes = ArtboardPropTypes;

  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    return (
      <ArtboardProvider viewport={this.props.viewport}>
        <sketch_artboard
          style={StyleSheet.flatten(this.props.style as UserStyles)}
          name={this.props.name}
          viewport={this.props.viewport}
          isHome={this.props.isHome}
        >
          {this.props.children}
        </sketch_artboard>
      </ArtboardProvider>
    );
  }
}
