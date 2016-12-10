/* @flow */
import React from 'react';
import { View } from '../../src';

type SpaceP = {
  h?: number,
  v?: number,
  children?: React$Element<any>,
};

function Space({ h, v, children }: SpaceP): React$Element<any> {
  return (
    <View
      style={{
        paddingHorizontal: h,
        paddingVertical: v,
      }}
    >
      { children }
    </View>
  );
}

export default Space;
