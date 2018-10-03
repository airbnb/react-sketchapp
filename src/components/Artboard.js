// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import StyleSheet from '../stylesheet';
import ViewStylePropTypes from './ViewStylePropTypes';

// $FlowFixMe
export default class Artboard extends React.Component {
  static propTypes = {
    // TODO(lmr): do some nice warning stuff like RN does
    style: or([PropTypes.shape(ViewStylePropTypes), PropTypes.number]),
    name: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    return (
      <artboard style={StyleSheet.flatten(this.props.style)} name={this.props.name}>
        {this.props.children}
      </artboard>
    );
  }
}
