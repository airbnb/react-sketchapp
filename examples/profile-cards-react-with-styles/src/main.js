/* eslint-disable react/prop-types */
import * as React from 'react';
import { render, Text, View } from 'react-sketchapp';
import Profile from './components/Profile';
import { css, withStyles } from './withStyles';

const Title = withStyles(({ fonts }) => ({
  titleText: fonts['Title 1'],
}))(({ children, styles }) => <Text {...css(styles.titleText)}>{children}</Text>);

const Page = ({ users }) => (
  <View>
    <Title>Profile Cards w/ react-with-styles</Title>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: users.length * 300,
      }}
    >
      {users.map(user => <Profile user={user} />)}
    </View>
  </View>
);

export default () => {
  const DATA = [
    {
      screen_name: 'jaredpalmer',
      name: 'Jared Palmer',
      description: 'Engineer @PalmerGroupHQ',
      location: 'New York, NY',
      url: 'github.com/jaredpalmer',
      profile_image_url: 'https://pbs.twimg.com/profile_images/662984079638405120/Y6oncSaf.jpg',
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
