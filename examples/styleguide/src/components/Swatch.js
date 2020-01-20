import * as React from 'react';
import { View } from 'react-sketchapp';
import AccessibilityBadge from './AccessibilityBadge';
import Label from './Label';

const SWATCH_WIDTH = 100;

const Swatch = ({ color, name }) => (
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
