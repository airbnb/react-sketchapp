import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import { StyleSheet } from '../stylesheet';
import { ViewStylePropTypes } from './ViewStylePropTypes';
import { ArtboardProvider } from '../context';

const ViewportPropTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.number,
  fontScale: PropTypes.number,
};

export const ArtboardPropTypes = {
  style: or([PropTypes.shape(ViewStylePropTypes), PropTypes.number]),
  name: PropTypes.string,
  isHome: PropTypes.bool,
  children: PropTypes.node,
  viewport: PropTypes.shape(ViewportPropTypes),
};

export type Props = PropTypes.InferProps<typeof ArtboardPropTypes>;

export class Artboard extends React.Component<Props> {
  static propTypes = ArtboardPropTypes;

  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    const style = StyleSheet.flatten(this.props.style);
    return (
      <ArtboardProvider viewport={this.props.viewport} style={style}>
        <sketch_artboard
          style={style}
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
