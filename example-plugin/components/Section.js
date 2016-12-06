/* @flow */
import React from 'react';
import Label from './Label';
import { View } from '../../src';

type P = {
  title: string,
  children?: any,
}
const Section = ({ title, children }: P) =>
  <View style={{ marginBottom: 96, flexDirection: 'row' }}>
    <View style={{ width: 200 }}>
      <Label bold>{ title }</Label>
    </View>
    { children }
  </View>;

export default Section;
