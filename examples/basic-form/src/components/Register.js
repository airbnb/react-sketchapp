import React from 'react';
import { View } from 'react-primitives';

const Register = ({ children }: Props) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
  >
    {children}
  </View>
);


export default Register;
