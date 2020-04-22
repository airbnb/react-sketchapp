import React from 'react';
import { View, Text } from 'react-sketchapp';
import { Link } from 'react-router-primitives';

import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

const PostSummary = () => (
  <Link to="/post/1">
    <View style={{ flexDirection: 'column' }}>
      <View style={{ backgroundColor: '#E2E2E2', height: 200, width: '100%' }} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24 }}>Title of a Blog Post</Text>
        <Text style={{ marginTop: 12 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
        <Text style={{ color: '#0072ce' }}>
          <Text style={{ fontWeight: 'bold' }}>{`> `}</Text>
          Click here to read more
        </Text>
      </View>
    </View>
  </Link>
);

const Home = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <AppBar />
    <NavBar />
    <View>
      <PostSummary />
    </View>
  </View>
);

export default Home;
