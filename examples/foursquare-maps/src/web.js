import React from 'react';
import { render } from 'react-dom';
import App from './App';
import getVenues from './getVenues';

getVenues(fetch).then(({
  venues,
  latitude,
  longitude,
}) => {
  render(<App venues={venues} center={{ latitude, longitude }} />, document.getElementById('app'));
});
