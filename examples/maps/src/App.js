import React, { PropTypes } from 'react';
import Map from 'react-primitives-google-static-map';
import { StyleSheet, Image, Text, View } from 'react-primitives';
import data from './data.json';

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 667,
    backgroundColor: '#fefefe',
    borderWidth: 2,
    borderColor: '#dfba69',
    borderRadius: 4,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    lineHeight: 24,
    color: '#dfba69',
    textAlign: 'center',
  },
  rowWrapper: {
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#dfba69',
  },
  rowTitle: {
    color: '#dfba69',
    fontSize: 18,
    fontFamily: 'GT America v2',
  },
  rowSubtitle: {
    color: '#dfba69',
    fontSize: 14,
    fontFamily: 'GT America v2',
  },
});

const Row = ({ name, location }) => (
  <View style={styles.rowWrapper}>
    <Text style={styles.rowTitle}>{name}</Text>
    <Text style={styles.rowSubtitle}>{location.address}</Text>
  </View>
);

const Document = ({ center, message, venues }) => {
  const pins = venues.map(v => ({ latitude: v.location.lat, longitude: v.location.lng }));
  return (
    <View style={styles.container}>
      <Map
        {...center}
        zoom={13}
        scale={1}
        hasCenterMarker={false}
        format="png"
        size={{
          width: 371,
          height: 200,
        }}
        markers={pins}
      />
      {venues.map(v => <Row key={v.id} {...v} />)}
    </View>
  );
};
Document.propTypes = { message: PropTypes.string };

const latitude = '37.773972';
const longitude = '-122.431297';

const venues = data.response.venues;

export default () => (
  <Document
    center={{
      latitude,
      longitude,
    }}
    venues={venues}
  />
);
