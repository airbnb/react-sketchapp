import React from 'react';
import { render, Text, View } from 'react-sketchapp';
import Client from 'gql-sketch';
import 'sketch-module-fetch-polyfill';
import type { User } from './types';
import { fonts, spacing } from './designSystem';
import Profile from './components/Profile';
import Space from './components/Space';

const GRAPHQL_ENDPOINT = 'https://api.graph.cool/simple/v1/cj09zm1k4jcpc0115ecsoc1k4';

const Page = ({ users }: { users: Array<User> }) => (
  <View>
    <Text style={fonts['Title 1']}>Profile Cards w/ GraphQL</Text>
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

export default (context) => {
  const QUERY = `{
    allProfiles {
      screenname,
      name,
      description,
      location,
      url,
      profileImageUrl,
    }
  }`;

  Client(GRAPHQL_ENDPOINT)
    .query(QUERY)
    .then(({ allProfiles }) => {
      render(<Page users={allProfiles} />, context.document.currentPage());
    })
    .catch(console.log);
}
