// @flow
import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-sketchapp';
import { colors, fonts, spacing } from '../designSystem';
import type { User } from '../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Haus,
    padding: 20,
    width: 260,
  },
  avatar: {
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: fonts['Title 2'],
  subtitle: fonts['Title 3'],
  body: fonts.Body,
});

type ProfileP = {
  user: User,
};

type AvatarP = {
  url: string,
};
const Avatar = ({ url }: AvatarP): React$Element<any> => (
  <Image source={url} style={styles.avatar} />
);

type TextP = { children?: string };
const Title = ({ children }: TextP): React$Element<any> => (
  <Text style={styles.title}>{children}</Text>
);

const Subtitle = ({ children }: TextP): React$Element<any> => (
  <Text style={styles.subtitle}>{children}</Text>
);

const Body = ({ children }: TextP): React$Element<any> => (
  <Text style={styles.body}>{children}</Text>
);

const Profile = (props: ProfileP): React$Element<any> => (
  <View style={styles.container}>
    <Avatar url={props.user.profileImageUrl} />
    <View style={{ marginBottom: spacing }}>
      <Title>{props.user.name}</Title>
      <Subtitle>@{props.user.screenname}</Subtitle>
    </View>
    <Body>{props.user.description}</Body>
    <Body>{props.user.location}</Body>
    <Body>{props.user.url}</Body>
  </View>
);

export default Profile;
