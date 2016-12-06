/* @flow */
import React from 'react';
import { keys } from 'ramda';
import View from './View';
import Swatch from './Swatch';

const SWATCH_WIDTH = 100;

type P = {
  colors: any,
}
const Palette = ({ colors }: P) =>
  <View
    style={{
      width: (SWATCH_WIDTH + 48) * 4,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}
  >
    { keys(colors).map(name =>
      <Swatch color={colors[name]} name={name} />
      )
    }
  </View>;

export default Palette;
