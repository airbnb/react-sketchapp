// @flow
import * as React from 'react';
import { View } from 'react-sketchapp';

type Props = {
  h?: number,
  v?: number,
  children?: React$Element<any>,
};

const Space = ({ h, v, children }: Props): React$Element<any> => (
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
