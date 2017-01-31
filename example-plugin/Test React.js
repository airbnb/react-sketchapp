/* @flow */
/* eslint-disable */
import React from 'react';
import { render, Text, TextStyles, View } from '../src';
import Profile from './Twitter';
import { dump } from '../src/debug';
import { fonts, spacing } from './designSystem';
import Space from './components/Space';
import Markdown from './components/Markdown';
import pkg from '../package.json';

type SketchContext = any;

const users = [
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
    profile_image_url: 'https://pbs.twimg.com/profile_images/773384639796740096/KdvxyX7M.jpg',
  },
];

const text = `
  # ${pkg.name} ${pkg.version}

  This is an example passing data from the Twitter API to a user profile card.
`;

const Page = () =>
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 600 }}>
    <View>
      <Markdown
        style={{
          width: 480,
        }}
        source={text}
      />
    </View>
    { users.map(user =>
      <Space h={spacing} v={spacing}>
        <Profile user={user} />
      </Space>
    )}
  </View>;

const onRun = (context: SketchContext) => {
  TextStyles.create({ context, clearExistingStyles: true }, fonts);
  render(<Page pkg={pkg} />, context);
};

module.exports = onRun;
