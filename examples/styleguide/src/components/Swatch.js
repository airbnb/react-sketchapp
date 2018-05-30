// @flow
import * as React from 'react';
import { View } from 'react-sketchapp';
import AccessibilityBadge from './AccessibilityBadge';
import Label from './Label';
import type { Color } from '../processColor';

const SWATCH_WIDTH = 100;

type P = {
  name: string,
  color: Color,
};
const Swatch = ({ color, name }: P) => (
  <View name={name} style={{ marginBottom: 48, marginRight: 48 }}>
    <View
      style={{
        width: SWATCH_WIDTH,
        height: SWATCH_WIDTH,
        backgroundColor: color.hex,
        borderRadius: 4,
        marginBottom: 8,
      }}
    />
    <Label bold>{name}</Label>
    <Label>{color.hex}</Label>
    <AccessibilityBadge level={color.accessibility} />
  </View>
);

export default Swatch;
