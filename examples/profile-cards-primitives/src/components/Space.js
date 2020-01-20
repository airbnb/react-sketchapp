import * as React from 'react';
import { View } from 'react-primitives';

const Space = ({ h, v, children }) => (
  <View
    style={{
      paddingHorizontal: h,
      paddingVertical: v,
    }}
  >
    {children}
  </View>
);

export default Space;
