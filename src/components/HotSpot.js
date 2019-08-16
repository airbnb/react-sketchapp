// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';

import View, { ViewPropTypes } from './View';

export const HotSpotPropTypes = {
  flow: PropTypes.shape({
    targetId: PropTypes.string,
    target: PropTypes.string,
    animationType: PropTypes.string,
  }),
};

// $FlowFixMe
export default class HotSpot extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    HotSpotPropTypes,
  };

  static defaultProps = {
    name: 'HotSpot',
  };

  render() {
    const { children, flow, ...props } = this.props;
    return (
      <View injectedProps={{ flow }} {...props}>
        {children}
      </View>
    );
  }
}
