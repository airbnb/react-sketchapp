/* @flow */
import React from 'react';
import Text from './Text';
import View from './View';
import Label from './Label';

type P = {
  name: string,
  style: any,
}
const TypeSpecimen = ({ name, style }: P) =>
  <View style={{ flexDirection: 'row' }}>
    <View style={{ width: 100 }}>
      <Label>
        {`${style.fontSize} / ${style.lineHeight}`}
      </Label>
    </View>
    <Text
      style={{
        ...style,
        flexStretch: 1,
        color: '#333',
      }}
    >
      { name }
    </Text>
  </View>;

export default TypeSpecimen;
