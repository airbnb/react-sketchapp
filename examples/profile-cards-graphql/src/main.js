import React from 'react';
import { render, Text, View } from 'react-sketchapp';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import type { User } from './types';
import { fonts, spacing } from './designSystem';
import Profile from './components/Profile';
import Space from './components/Space';

const GRAPHQL_ENDPOINT = 'https://api.graph.cool/simple/v1/cj09zm1k4jcpc0115ecsoc1k4';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_ENDPOINT })
});

const QUERY = gql`
  {
    allProfiles {
      screenname,
      name,
      description,
      location,
      url,
      profileImageUrl,
    }
  }
`;

const props = ({ data }) => data.loading ? { users: [] } : { users: data.allProfiles };
const withUsers = graphql(QUERY, { props });

const Page = ({ users }: { users: Array<User> }) => (
  <View>
    <Text style={fonts['Title 1']}>Profile Cards w/ GraphQL</Text>
    {users && (
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
    )}
  </View>
);

const PageWithUsers = withUsers(Page);

const App = () => (
  <ApolloProvider client={client}>
    <PageWithUsers />
  </ApolloProvider>
);

export default (context) => {
  getDataFromTree(App)
    .then(() => render(<App />, context.document.currentPage()))
    .catch(console.log);
}
