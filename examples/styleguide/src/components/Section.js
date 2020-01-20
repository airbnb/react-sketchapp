import * as React from 'react';
import { View } from 'react-sketchapp';
import Label from './Label';

const Section = ({ title, children }) => (
  <View style={{ marginBottom: 96, flexDirection: 'row' }}>
    <View style={{ width: 200 }}>
      <Label bold>{title}</Label>
    </View>
    <View>{children}</View>
  </View>
);

export default Section;
