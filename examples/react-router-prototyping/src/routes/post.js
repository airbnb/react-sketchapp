import React from 'react';
import { View, Text } from 'react-sketchapp';
import { Link } from 'react-router-primitives';

import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

const posts = {
  '1': {
    title: 'Title of a Blog Post',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: {
      id: 'john',
      name: 'John',
    },
  },
};

const Post = ({ id }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppBar />
      <NavBar />
      {id && (
        <View style={{ flexDirection: 'column' }}>
          <View style={{ backgroundColor: '#E2E2E2', height: 400, width: '100%' }} />
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 32, marginBottom: 16 }}>{posts[id].title}</Text>
            <Link to={`/profile/${posts[id].author.id}`}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    backgroundColor: '#dedede',
                    marginRight: 16,
                  }}
                />
                <Text style={{ fontSize: 20, color: 'black' }}>{posts[id].author.name}</Text>
              </View>
            </Link>
            <Text style={{ marginTop: 12 }}>{posts[id].content}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Post;
