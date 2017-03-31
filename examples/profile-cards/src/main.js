import React from 'react';
import { render, Artboard, View } from 'react-sketchapp';
import { spacing } from './designSystem';
import Profile from './components/Profile';
import Space from './components/Space';

export type User = {
  screen_name: string,
  name: string,
  description: string,
  profile_image_url: string,
  location: string,
  url: string,
};

const Page = ({ users }: { users: Array<User> }) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: users.length * 300,
    }}
  >
    {users.map(user => <Profile user={user} />)}
  </View>
);

const onRun = (context) => {
  const DATA = [
    {
      screen_name: 'mxstbr',
      name: 'Max Stoiber',
      description: '⚛️ Makes styled-components, react-boilerplate, @KeystoneJS and CarteBlanche. ✌ Open source developer @thethinkmill. ☕ Speciality coffee geek, skier, traveller.',
      location: 'Vienna, Austria',
      url: 'mxstbr.com',
      profile_image_url: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
      name: '- ̗̀Jackie ̖́-',
      screen_name: 'jackiesaik',
      description: 'Graphic designer, never won a spelling be. Toronto on weekdays. Go Home Lake on weekends. ╮ (. ● ᴗ ●.) ╭',
      location: 'Toronto, ON',
      url: 'cargocollective.com/jackiesaik',
      profile_image_url: 'https://pbs.twimg.com/profile_images/756488692135526400/JUCawBiW_400x400.jpg',
    },
    {
      screen_name: 'jongold',
      name: 'kerning man',
      description: 'an equal command of technology and form • functional programming (oc)cultist • design tools @airbnbdesign',
      location: 'California',
      url: 'weirdwideweb.jon.gold',
      profile_image_url: 'https://pbs.twimg.com/profile_images/833785170285178881/loBb32g3.jpg',
    },
  ];

  render(<Page users={DATA} />, context);
};

module.exports = onRun;
