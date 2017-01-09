/* @flow */
import React from 'react';
import { View, Text, StyleSheet } from '../../src';
import Label from './Label';

type P = {
  name: string,
  style: any,
}
const TypeSpecimen = ({ name, style }: P) => {
  style = StyleSheet.flatten(style);
  return (
    <View
      name={`TypeSpecimen-${name}`}
      style={{ flexDirection: 'row', marginBottom: 24 }}
    >
      <View style={{ width: 100 }}>
        <Label>
          {`${style.fontSize} / ${style.lineHeight}`}
        </Label>
      </View>
      <Text
        style={{
          ...style,
        }}
      >
        { name }
      </Text>
    </View>
  );
}

export default TypeSpecimen;
