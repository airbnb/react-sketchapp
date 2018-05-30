// @flow
import * as React from 'react';
import { View } from 'react-sketchapp';
import Swatch from './Swatch';

const SWATCH_WIDTH = 100;

type P = {
  colors: any,
};
const Palette = ({ colors }: P) => (
  <View
    style={{
      width: (SWATCH_WIDTH + 48) * 4,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}
  >
    {Object.keys(colors).map(name => <Swatch key={name} color={colors[name]} name={name} />)}
  </View>
);

export default Palette;
