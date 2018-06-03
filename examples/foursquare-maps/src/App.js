import * as React from 'react';
import * as PropTypes from 'prop-types';
import Map from 'react-primitives-google-static-map';
import { StyleSheet, Text, View } from 'react-primitives';

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 667,
    backgroundColor: '#fefefe',
    borderWidth: 2,
    borderColor: '#dfba69',
    borderRadius: 4,
    overflowY: 'scroll',
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    lineHeight: 24,
    color: '#dfba69',
    textAlign: 'center',
  },
  rowWrapper: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 2,
    borderBottomColor: '#dfba69',
  },
  rowTitle: {
    color: '#dfba69',
    fontSize: 18,
    // lineHeight: 27,
    fontWeight: 'bold',
    fontFamily: 'GT America',
  },
  rowSubtitle: {
    color: '#dfba69',
    fontSize: 14,
    // lineHeight: 18,
    fontFamily: 'GT America',
  },
});

const LatLong = PropTypes.shape({
  latitude: PropTypes.string,
  longitude: PropTypes.string,
});

const Venue = {
  name: PropTypes.string,
  location: PropTypes.shape({
    // eslint-disable-next-line react/no-unused-prop-types
    address: PropTypes.string,
  }),
};

const Row = ({ name, location }) => (
  <View style={styles.rowWrapper} name={name}>
    <Text style={styles.rowTitle}>{name}</Text>
    <Text style={styles.rowSubtitle}>{location.address}</Text>
  </View>
);

Row.propTypes = Venue;

const App = ({ center, venues }) => {
  const pins = venues.map(v => ({
    latitude: v.location.lat,
    longitude: v.location.lng,
  }));
  return (
    <View style={styles.container} name="Wrapper">
      <Map
        {...center}
        zoom={12}
        scale={1}
        hasCenterMarker={false}
        format="png"
        size={{
          width: 371,
          height: 200,
        }}
        markers={pins}
      />
      <View name="ListView">{venues.map(v => <Row key={v.id} {...v} />)}</View>
    </View>
  );
};

App.propTypes = {
  center: LatLong,
  venues: PropTypes.arrayOf(PropTypes.shape(Venue)),
};

export default App;
