import React from 'react';
import { View, Text } from 'react-sketchapp';
import { Link } from 'react-router-primitives';

const MenuItem = ({ name, href }) => (
  <Link to={href}>
    <View style={{ padding: 8 }}>
      <Text style={{ fontSize: 16, fontFamily: 'Helvetica Neue', color: '#0072ce' }}>{name}</Text>
    </View>
  </Link>
);

const NavBar = () => (
  <View
    style={{
      height: 40,
      width: '100%',
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}
  >
    {[{ name: 'About Us', href: '/about' }].map((props) => (
      <MenuItem {...props} />
    ))}
  </View>
);

export default NavBar;
