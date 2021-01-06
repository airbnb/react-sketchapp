import React from 'react';
import { View, Text } from 'react-sketchapp';

import AppBar from '../components/AppBar';

const About = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <AppBar />
    <View style={{ height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32, color: 'black' }}>About Us</Text>
    </View>
    <View style={{ height: 200, width: '100%', padding: 40 }}>
      <Text style={{ fontSize: 20, color: 'black' }}>
        There is not a lot of information here about us.
      </Text>
    </View>
  </View>
);

export default About;
