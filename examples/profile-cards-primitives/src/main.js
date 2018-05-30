import * as React from 'react';
import { render } from 'react-sketchapp';
import { Text, View } from 'react-primitives';
import type { User } from './types';
import { fonts, spacing } from './designSystem';
import Profile from './components/Profile';
import Space from './components/Space';
import DATA from './data';

const Page = ({ users }: { users: Array<User> }) => (
  <View>
    <Text style={fonts['Title 1']}>Profile Cards w/ React Primitives</Text>
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
  render(<Page users={DATA} />, context.document.currentPage());
};
