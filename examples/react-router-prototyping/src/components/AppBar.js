import React from 'react';
import { View, Text } from 'react-sketchapp';
import { Link } from 'react-router-primitives';

const AppBar = () => (
  <Link to="/">
    <View
      style={{
        backgroundColor: '#fff',
        height: 80,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#e6e6e6',
          borderBottomStyle: 'solid',
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>My Blog</Text>
      </View>
    </View>
  </Link>
);

export default AppBar;
