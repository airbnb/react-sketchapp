/* eslint-disable react/prop-types */
import * as React from 'react';
import { Image, View, Text } from 'react-sketchapp';
import { css, withStyles } from '../withStyles';

const Profile = ({ user, styles }) => (
  <View {...css(styles.container)}>
    <Image source={user.profile_image_url} {...css(styles.avatar)} />
    <View {...css(styles.titleWrapper)}>
      <Text {...css(styles.title)}>{user.name}</Text>
      <Text {...css(styles.subtitle)}>{`@${user.screen_name}`}</Text>
    </View>
    <Text {...css(styles.body)}>{user.description}</Text>
    <Text {...css(styles.body)}>{user.location}</Text>
    <Text {...css(styles.body)}>{user.url}</Text>
  </View>
);

export default withStyles(({ colors, fonts, spacing }) => ({
  container: {
    backgroundColor: colors.Haus,
    padding: spacing,
    width: 260,
    marginRight: spacing,
  },
  avatar: {
    height: 220,
    resizeMode: 'contain',
    marginBottom: spacing * 2,
    borderRadius: 10,
  },
  titleWrapper: {
    marginBottom: spacing,
  },
  title: { ...fonts['Title 2'] },
  subtitle: { ...fonts['Title 3'] },
  body: { ...fonts.Body },
}))(Profile);
