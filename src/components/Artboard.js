// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

const ViewportPropTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

// $FlowFixMe
export default class Artboard extends React.Component {
  static propTypes = {
    // TODO(lmr): do some nice warning stuff like RN does
    style: or([PropTypes.shape(ViewStylePropTypes), PropTypes.number]),
    name: PropTypes.string,
    children: PropTypes.node,
    viewport: PropTypes.shape(ViewportPropTypes),
  };

  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    return (
      <artboard
        style={StyleSheet.flatten(this.props.style)}
        name={this.props.name}
        viewport={this.props.viewport}
      >
        {this.props.children}
      </artboard>
    );
  }
}
