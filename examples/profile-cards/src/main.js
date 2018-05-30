import * as React from 'react';
import { render, Text, View } from 'react-sketchapp';
import type { User } from './types';
import { fonts, spacing } from './designSystem';
import Profile from './components/Profile';
import Space from './components/Space';

const Page = ({ users }: { users: Array<User> }) => (
  <View>
    <Text style={fonts['Title 1']}>Profile Cards</Text>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: users.length * 300,
      }}
    >
      {users.map(user => (
        <Space key={user.screen_name} h={spacing} v={spacing}>
          <Profile user={user} />
        </Space>
      ))}
    </View>
  </View>
);

export default () => {
  const DATA = [
    {
      screen_name: 'mxstbr',
      name: 'Max Stoiber',
      description:
        '⚛️ Makes styled-components, react-boilerplate, @KeystoneJS and CarteBlanche. ✌ Open source developer @thethinkmill. ☕ Speciality coffee geek, skier, traveller.',
      location: 'Vienna, Austria',
      url: 'mxstbr.com',
      profile_image_url:
        'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
      name: '- ̗̀Jackie ̖́-',
      screen_name: 'jackiesaik',
      description:
        'Graphic designer, never won a spelling be. Toronto on weekdays. Go Home Lake on weekends. ╮ (. ● ᴗ ●.) ╭',
      location: 'Toronto, ON',
      url: 'cargocollective.com/jackiesaik',
      profile_image_url:
        'https://pbs.twimg.com/profile_images/895665264464764930/7Mb3QtEB_400x400.jpg',
    },
    {
      screen_name: 'jongold',
      name: 'kerning man',
      description:
        'an equal command of technology and form • functional programming (oc)cultist • design tools @airbnbdesign',
      location: 'California',
      url: 'weirdwideweb.jon.gold',
      profile_image_url: 'https://pbs.twimg.com/profile_images/833785170285178881/loBb32g3.jpg',
    },
  ];

  render(<Page users={DATA} />, context.document.currentPage());
};
