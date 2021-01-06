import React from 'react';
import { View, Text } from 'react-sketchapp';

import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

const Profile = ({ user }) => {
  const name = user ? `${user.charAt(0).toUpperCase()}${user.slice(1)}` : 'User not found';

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppBar />
      <NavBar />
      <View style={{ height: 200, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>{name}</Text>
      </View>
    </View>
  );
};

export default Profile;
